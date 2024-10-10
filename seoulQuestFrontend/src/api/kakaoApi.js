// import axios from "axios";
// import { API_SERVER_HOST } from "./todoApi";

// const rest_api_key = "40924e760d2aef76f9429464caa9191c"; //rest키 값
// const redirect_uri = "http://localhost:3000/member/kakao"; //로그인후 이동할 RedirectUri
// const auth_code_path = "https://kauth.kakao.com/oauth/authorize"; //인가 코드를 받기위한 경로
// const access_token_url = `https://kauth.kakao.com/oauth/token`; //인가코드로 accessToken을 받기위해 호출

// export const getKakaoLoginLink = () => {
//   const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
//   return kakaoURL;
// };

// export const getAccessToken = async (authCode) => {
//   //accessToken받아오는 함수
//   const header = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   };

//   const params = {
//     grant_type: "authorization_code", //고정값
//     client_id: rest_api_key, //지정된 rest키값
//     redirect_uri: redirect_uri, //인가코드가 redirect된 uri
//     code: authCode, //인가코드 받기 요청으로 얻은 인가코드
//   };

//   const res = await axios.post(access_token_url, params, header);
//   const accessToken = res.data.access_token;

//   return accessToken;
// };

// export const getMemberWithAccessToken = async (accessToken) => {
//   const res = await axios.get(
//     `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`
//   );
//   return res.data;
// };
