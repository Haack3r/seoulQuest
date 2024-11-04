import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.password);

  const res = await axios.post(`${host}/login`, form, header);
  return res.data;
};
export const modifyMember = async (member) => {
  const res = await jwtAxios.put(`${host}/modify`, member);
  return res.data;
};

export const checkEmail = async (email) => {
  console.log("checkEmail", email);
  const headers = { "Content-Type": "application/json" };
  const res = await axios.post(`${host}/check`, JSON.stringify({ email }), {
    headers,
  });
  return res.data;
};
export const checkNickname = async (nickName) => {
  console.log("checkNickname", nickName);
  const headers = { "Content-Type": "application/json" };
  const res = await axios.post(
    `${host}/checknickname`,
    JSON.stringify({ nickName }),
    {
      headers,
    }
  );
  return res.data;
};
export const registerMember = async (obj) => {
  console.log("obj:", obj);
  const headers = { "Content-Type": "application/json" };

  try {
    const res = await axios.post(
      `${host}/signup`,
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
        password: obj.password,
      },
      { headers }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};



// export const registerMember = async (obj) => {
//   console.log("obj:", obj);
//   const headers = { headers: { "Content-Type": "application/json" } };

//   try {
//     const res = await axios.post(
//       `${host}/signup`,
//       {
//         name: obj.name,
//         email: obj.email,
//         password: obj.password,
//       },
//       { headers }
//     );
//     return res.data;
//   } catch (error) {
//     throw new Error(error.res.data.message || "Registration failed");
//   }
// };
