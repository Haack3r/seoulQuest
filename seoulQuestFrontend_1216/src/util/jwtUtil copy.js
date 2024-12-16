import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
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
  async (res) => {
    const data = res.data;
    if (data && data.error === "ERROR_ACCESS_TOKEN") {
      const memberCookieValue = getCookie("member");
      const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken);

      // Update cookie with new tokens
      memberCookieValue.accessToken = result.accessToken;
      memberCookieValue.refreshToken = result.refreshToken;
      setCookie("member", JSON.stringify(memberCookieValue), 1);

      // Retry original request with new token
      res.config.headers.Authorization = `Bearer ${result.accessToken}`;
      return await axios(res.config);
    }
    return res;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default jwtAxios;
