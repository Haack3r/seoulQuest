import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;
  const headers = { Authorization: `Bearer ${accessToken}`, 'Cache-Control': 'no-cache' };

  try {
    const res = await axios.get(`${host}/api/member/refresh`,
      {
        params: { refreshToken },
        headers
      });
    if (res.data.error) {
      switch (res.data.error) {
        case "NULL_REFRESH_TOKEN":
        case "INVALID_ACCESS_TOKEN":
          removeCookie("member");
          window.location.href = '/login';
          break;
        default:
          throw new Error(res.data.error);
      }
    }

    return res.data;
  } catch (error) {
    console.error("Token refresh failed:", error);
    removeCookie("member");
    window.location.href = '/login';
    throw error;
  }
};

// Before request interceptor
jwtAxios.interceptors.request.use(
  (config) => {
    const memberInfo = getCookie("member");
    console.log("Request Interceptor - Original config:", config);

    const parsedMemberInfo = typeof memberInfo === 'string'
      ? JSON.parse(memberInfo)
      : memberInfo;

    if (!memberInfo) {
      console.log("Member NOT FOUND in interceptor");
      return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
    }

    const { accessToken } = parsedMemberInfo;
    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log("Request Interceptor - Final headers:", config.headers);
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Before response interceptor
jwtAxios.interceptors.response.use(
  async (res) => {
    const data = res.data;
    if (data && data.error) {
      if (data.error === "Expired") {
        const memberCookieValue = getCookie("member");
        if (!memberCookieValue) {
          window.location.href = '/login';
          return Promise.reject(data.error);
        }

        try {
          const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken);
          // Update cookie with new tokens
          memberCookieValue.accessToken = result.accessToken;
          memberCookieValue.refreshToken = result.refreshToken;
          setCookie("member", JSON.stringify(memberCookieValue), 1);

          // Retry original request with new token
          res.config.headers.Authorization = `Bearer ${result.accessToken}`;
          return await axios(res.config);
        } catch (refreshError) {
          removeCookie("member");
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else if (["Malformed", "Invalid"].includes(data.error)) {
        removeCookie("member");
        window.location.href = '/login';
      }
    }
    return res;
  },
  (error) => {
    if (error.response?.status === 403) {
      removeCookie("member");
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default jwtAxios;
