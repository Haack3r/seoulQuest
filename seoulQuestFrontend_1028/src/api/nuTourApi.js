import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/tours`;

//서버에서 목록데이터 가져옴
export const getListTNU = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${host}/list`, {
        params: { page: page, size: 10 },
    });
    return res.data;
}

//서버에서 메인에 표시할 3개의 데이터만 가져옴
export const getListTourForMain = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${host}/list`, {
        params: { page: page, size:3 }, 
    });
    return res.data;
}

//특정 상품 데이터 조회
export const getOneTNU = async (tno) => {
    const res = await axios.get(`${host}/${tno}`)
    return res.data;
}