import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/products`;


//p264, 서버에서 목록 데이터를 가져오기 위한 함수
export const getListNU = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/list`, {
    params: { page: page, size: 10 },
  });
  return res.data;
};

export const getListForMain = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/list`, {
    params: { page: page, size: 3 },
  });
  return res.data;
};

//p273, Axios로 특정 상품 데이터 조회
export const getOneNU = async (pno) => {
  const res = await axios.get(`${host}/${pno}`);
  return res.data;
};


