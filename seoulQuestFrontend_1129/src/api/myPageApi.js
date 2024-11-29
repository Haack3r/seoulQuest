import jwtAxios from "../util/jwtUtil";
import axios from "axios";
import { API_SERVER_HOST } from "./reviewApi";

const host = `${API_SERVER_HOST}/api/mypage`;

export const getUserInfo = async () => {
  console.log("getUserInfo:100) ")
  const res = await jwtAxios.get(`${host}/info`);
  console.log("res:",res)
  return res.data;
};


export const findPassword = async (obj) => {
  console.log("obj:", obj);
  const headers = { "Content-Type": "application/json" };

  try {
    const res = await axios.post(
      `${host}/findpassword`,obj,{ headers }
    );
    return res.data;
  } catch (error) {
    console.log(error.response?.data?.message);
    return error.response?.data?.message;
  }
};


export const findEmail = async (obj) => {
  console.log("obj:", obj);
  const headers = { "Content-Type": "application/json" };

  try {
    const res = await axios.post(
      `${host}/findemail`, obj,
      { headers }
    );
    return res.data;
  } catch (error) {
    console.log(error.response?.data?.message);
    return error.response?.data?.message;
  }
};


export const postUserInfoforEdit = async (obj) => {
  console.log("obj:", obj);
  const headers = { "Content-Type": "application/json" };
  try {
    const res = await jwtAxios.post(
      `${host}/editprofile`,obj,{ headers }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to edit profile");
  }
};

export const getOrderAndPaymentInfo = async () =>{
  const res = await jwtAxios.get(`${host}/products/orderPaymentInfo`);
  console.log("res:",res)
  return res.data;
}

