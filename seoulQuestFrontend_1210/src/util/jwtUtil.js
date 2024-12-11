import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookieUtil";

const jwtAxios = axios.create();
const host = "http://localhost:8080";

const refreshJWT = async (accessToken, refreshToken) => {
  console.log("=== refreshJWT 함수 시작 ===");
  console.log("Access Token:", accessToken);
  console.log("refreshToken:", refreshToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Cache-Control': 'no-cache',
    'refreshToken': refreshToken
  };
  console.log("Headers:", headers);

  try {
    console.log("Refresh 요청 시작:", `${host}/api/member/refresh`);
    const res = await axios.get(`${host}/api/member/refresh`, { headers });
    console.log("Refresh 응답:", res.data);
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
    console.error("=== Refresh 토큰 에러 ===");
    console.error("Error details:", error.response?.data || error.message);
    removeCookie("member");
    window.location.href = '/member/login';
    throw error;
  }
};

// Request Interceptor
jwtAxios.interceptors.request.use(
  (config) => {
    // console.log("=== Request Interceptor 시작 ===");
    const memberInfo = getCookie("member");
    // console.log("Cookie에서 가져온 memberInfo:", memberInfo);

    const parsedMemberInfo = typeof memberInfo === 'string'
      ? JSON.parse(memberInfo)
      : memberInfo;
    // console.log("파싱된 memberInfo:", parsedMemberInfo);

    if (!memberInfo) {
      console.log("멤버 정보 없음");
      return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
    }

    const { accessToken } = parsedMemberInfo;
    // console.log("사용할 Access Token:", accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
    // console.log("Request Interceptor - Final headers:", config.headers);
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
jwtAxios.interceptors.response.use(
  async (res) => {
    // console.log("=== Response Interceptor 시작 ===");

    // 응답 데이터 표준화
    const data = res.data?.data || res.data;

    // 에러 응답 먼저 체크
    if (data.error) {
      // 토큰 관련 에러 처리
      if (data.error === "ERROR_ACCESS_TOKEN" ||
        data.error === "Expired" ||
        data.error === "INVALID_ACCESS_TOKEN") {

        console.log("토큰 관련 에러 발생. Refresh 시도");
        const memberCookieValue = getCookie("member");

        if (!memberCookieValue) {
          throw new Error("로그인 정보가 없습니다.");
        }

        try {
          const parsedMemberInfo = typeof memberCookieValue === 'string'
            ? JSON.parse(memberCookieValue)
            : memberCookieValue;

          const result = await refreshJWT(
            parsedMemberInfo.accessToken,
            parsedMemberInfo.refreshToken
          );

          // 새로운 토큰으로 쿠키 업데이트
          parsedMemberInfo.accessToken = result.accessToken;
          parsedMemberInfo.refreshToken = result.refreshToken;
          setCookie("member", JSON.stringify(parsedMemberInfo), 1);

          // 원래 요청 재시도
          res.config.headers.Authorization = `Bearer ${result.accessToken}`;
          return await jwtAxios(res.config);
        } catch (error) {
          console.error("토큰 갱신 실패:", error);
          removeCookie("member");
          window.location.href = '/member/login';
          throw error;
        }
      }

      // 다른 에러는 그대로 throw
      throw new Error(data.error);
    }

    // 정상 응답
    return res;
  },
  (error) => {
    console.error("=== Response Error Handler ===");
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);

    // 특정 에러 상태 처리
    if (error.response?.status === 404 || error.response?.status === 401) {
      console.log("인증 관련 에러 발생");
      removeCookie("member");
      window.location.href = '/member/login';
    }
    return Promise.reject(error);
  }
);

export default jwtAxios;

// import axios from "axios";
// import { getCookie, setCookie } from "./cookieUtil";

// const jwtAxios = axios.create();
// const host = "http://localhost:8080";

// const refreshJWT = async (accessToken, refreshToken) => {
//   const headers = { Authorization: `Bearer ${accessToken}`, 'Cache-Control': 'no-cache' };

//   try {
//     const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, { headers });
//     return res.data;
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     throw error;
//   }
// };

// // Before request interceptor
// jwtAxios.interceptors.request.use(
//   (config) => {
//     const memberInfo = getCookie("member");

//     if (!memberInfo) {
//       console.log("Member NOT FOUND");
//       return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
//     }

//     const { accessToken } = memberInfo;
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );

// // Before response interceptor
// jwtAxios.interceptors.response.use(
//   async (res) => {
//     const data = res.data;
//     if (data && data.error === "ERROR_ACCESS_TOKEN") {
//       const memberCookieValue = getCookie("member");
//       const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken);

//       // Update cookie with new tokens
//       memberCookieValue.accessToken = result.accessToken;
//       memberCookieValue.refreshToken = result.refreshToken;
//       setCookie("member", JSON.stringify(memberCookieValue), 1);

//       // Retry original request with new token
//       res.config.headers.Authorization = `Bearer ${result.accessToken}`;
//       return await axios(res.config);
//     }
//     return res;
//   },
//   (error) => {
//     console.error("Response error:", error);
//     return Promise.reject(error);
//   }
// );

// export default jwtAxios;