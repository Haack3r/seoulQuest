import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/mypage`;

export const getUserInfo = async () => {
  console.log("getUserInfo:100) ")
  const res = await jwtAxios.get(`${host}/info`);
  console.log("res:",res)
  return res.data;
};

export const getUserInfoforEdit = async () => {
  console.log("getUserInfo:200) ")
  const res = await jwtAxios.get(`${host}/editProfile`);
  console.log("res:",res)
  return res.data;
};


