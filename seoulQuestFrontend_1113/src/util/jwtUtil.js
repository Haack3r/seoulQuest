import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;
  const headers = { Authorization: `Bearer ${accessToken}`, 'Cache-Control': 'no-cache' };

 
  try {
    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, { headers });
    return res.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

// Before request interceptor
jwtAxios.interceptors.request.use(
  (config) => {
    const memberInfo = getCookie("member");

    if (!memberInfo) {
      console.log("Member NOT FOUND");
      return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
    }

    const { accessToken } = memberInfo;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);



// Before response interceptor
jwtAxios.interceptors.response.use(
    async (response) => {
      return response; // Proceed if the response is successful
    },
    async (error) => {
      // Handle 302 redirects or authentication errors
      if (error.response && error.response.status === 302) {
        console.error("Redirect detected, authentication may be required.");
        // You can handle the redirect by redirecting to a login page or refreshing the token
        removeCookie("member"); // Clear token if necessary
        window.location.href = "/login"; // Redirect to login if required
      }
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized - invalid or expired token.");
        // Handle token refresh or prompt for re-authentication
        const memberInfo = getCookie("member");
        if (memberInfo && memberInfo.refreshToken) {
          try {
            const refreshedToken = await refreshJWT(
              memberInfo.accessToken,
              memberInfo.refreshToken
            );
            setCookie("member", JSON.stringify(refreshedToken), 1);
            error.config.headers.Authorization = `Bearer ${refreshedToken.accessToken}`;
            return jwtAxios(error.config); // Retry request with new token
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            removeCookie("member");
            window.location.href = "/login";
          }
        } else {
          window.location.href = "/login"; // Redirect if no token is found
        }
      }
      return Promise.reject(error);
    }
  );
  
  

export default jwtAxios;
