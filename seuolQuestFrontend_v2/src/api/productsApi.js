import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/user/products`;

export const postAdd = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${host}/`, product, header);
  return res.data;
};

//p264, 서버에서 목록 데이터를 가져오기 위한 함수
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${host}/list`, {
    params: { page: page, size: 10 },
  });
  return res.data;
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
