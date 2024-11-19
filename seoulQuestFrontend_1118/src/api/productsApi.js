import { API_SERVER_HOST } from "./reviewApi";
import jwtAxios from "../util/jwtUtil";
import axios from "axios";

const host = `${API_SERVER_HOST}/api/user/products`;

export const postAdd = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${host}/`, product, header);
  return res.data;
};

//p264, 서버에서 목록 데이터를 가져오기 위한 함수
export const getList = async ({ page, size, keyword = "", type = "t" }) => {
  try {
    const res = await jwtAxios.get(`${host}/list`, {
      params: {
        page,
        size,
        keyword, // Search keyword
        type, // Search type
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

//p273, Axios로 특정 상품 데이터 조회
export const getOne = async (pno) => {
  const res = await jwtAxios.get(`${host}/${pno}`);
  return res.data;
};

// p281, 수정/삭제
export const putOne = async (pno, product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/${pno}`, product, header);
  return res.data;
};

export const deleteOne = async (pno) => {
  const res = await jwtAxios.delete(`${host}/${pno}`);
  return res.data;
};

//order : 처음에 유저정보와 유저의 쿠폰정보 가져올때 사용
//product & tour 같이 사용
export const getOrderInfo = async () => {
  const res = await jwtAxios.get(`${host}/orderinfo`);
  return res.data;
};
  
  
//order : 유저의 order정보를 서버로 보냄
export const postOrderInfo = async (orderInfo) => {
  console.log("보내는 정보 orderInfo" , orderInfo)
  const headers = { "Content-Type": "application/json" };

  try {
    const res = await jwtAxios.post(`${host}/orders`, orderInfo, { headers });
    console.log(res);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to Post order info");
  }
};

// payment: 유저의 결제 정보를 서버로 보냄 , impUid포함한 정보.
export const postPayInfo = async (orderInfoWithOrderId, impUid) => {
  console.log("payment:", orderInfoWithOrderId);
  const headers = { "Content-Type": "application/json" };

  try {
    const res = await jwtAxios.post(
      `${host}/payment/${impUid}`,
        orderInfoWithOrderId,
      { headers }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to Post payment info");
  }
};

