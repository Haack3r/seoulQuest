import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";
import axios from "axios";

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
      `${host}/findpassword`,
      {
        email: obj.email,
        phoneNumber1: obj.phoneNumber1,
        phoneNumber2: obj.phoneNumber2,
        phoneNumber3: obj.phoneNumber3,
      },
      { headers }
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
      `${host}/findemail`,
      {
        firstname: obj.firstname,
        lastname: obj.lastname,
        phoneNumber1: obj.phoneNumber1,
        phoneNumber2: obj.phoneNumber2,
        phoneNumber3: obj.phoneNumber3,
      },
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
    const res = await axios.post(
      `${host}/editprofile`,
      {
        firstname: obj.firstname,
        lastname: obj.lastname,
        nickName: obj.nickName,
        email: obj.email,
        phoneNumber1: obj.phoneNumber1,
        phoneNumber2: obj.phoneNumber2,
        phoneNumber3: obj.phoneNumber3,
        birthday: obj.birthday,
        country: obj.country,
        state: obj.state,
        city: obj.city,
        street: obj.street,
        zipcode: obj.zipcode,
        password: obj.newPassword,
      },
      { headers }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to edit profile");
  }
};



