import axios from "axios";
import { API_SERVER_HOST } from "./reviewApi";

const host = `${API_SERVER_HOST}/api/products`;

//p264, 서버에서 목록 데이터를 가져오기 위한 함수
export const getListNU = async ({ page, size, keyword = "", type = "t", category = "" }) => {
  try {
    const res = await axios.get(`${host}/list`, {
      params: {
        page,
        size:9,
        keyword, // Search keyword
        type, // Search type
        category
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProductCategoriesNU = async () => {
  try {
    const response = await axios.get(`${host}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tour categories:", error.message);
    throw error;
  }
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
