import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/tours`;

//서버에서 목록데이터 가져옴
export const getListTNU = async ({ page, size, keyword = "", type = "t" }) => {
    try { const res = await axios.get(`${host}/list`, {
        params: {
            page,
            size,
            keyword, // Search keyword
            type,    // Search type
          },
    });
    return res.data;
} catch (error) {
    throw error;
  }
};


//특정 상품 데이터 조회
export const getOneTNU = async (tno) => {
    const res = await axios.get(`${host}/${tno}`)
    return res.data;
}