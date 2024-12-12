import axios from "axios";
import { API_SERVER_HOST } from "./reviewApi";

const host = `${API_SERVER_HOST}/api/tours`;

//서버에서 목록데이터 가져옴
export const getListTNU = async ({ page, size = 9, keyword = "", type = "t", category = "" }) => {
    try {
        console.log("API params:", { page, size, keyword, type, category });
        const res = await axios.get(`${host}/list`, {
            params: {
              page,
              size: 9,
              keyword, // Search keyword
                type,
              category  // Search type
            },
        });
        console.log("API response:", res.data);
        return res.data;
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
};

export const getTopReservedToursNU = async (limit) => {
  try {
    const response = await axios.get(`${host}/top`, { params: { limit } });
    return response.data;
  } catch (error) {
    console.error("Error fetching top reserved tours:", error);
    throw error;
  }
};

export const getTourCategoriesTNU = async () => {
    try {
      const response = await axios.get(`${host}/categories`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tour categories:", error.message);
      throw error;
    }
  };

//특정 상품 데이터 조회
export const getOneTNU = async (tno) => {
    const res = await axios.get(`${host}/${tno}`)
    return res.data;
}

export const getAvailableCapacity = async (tno,selectedDate) => {
  const res = await axios.get(`${host}/available`,{ params: { tno, selectedDate } });
  return res.data;
};
