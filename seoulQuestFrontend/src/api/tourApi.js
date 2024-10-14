import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
// import jwtAxios from "../util/jwtUtil"; 

const host = `${API_SERVER_HOST}/api/tours`;

//등록
export const postAdd = async (tour) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post(`${host}/`, tour , header);
    return res.data;
}

//서버에서 목록데이터 가져옴
export const getList = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${host}/list`, {
        params: { page: page, size: 10 },
    });
    return res.data;
}

//서버에서 메인에 표시할 3개의 데이터만 가져옴
export const getListForMain = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${host}/list`, {
        params: { page: page, size:3 }, 
    });
    return res.data;
}

//특정 상품 데이터 조회
export const getOne = async (tno) => {
    const res = await axios.get(`${host}/${tno}`)
    return res.data;
}

//수정
export const putOne = async (tno, tour) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } }
    const res = await axios.put(`${host}/${tno}`, tour, header);
    return res.data;
}

//삭제
export const deleteOne = async (tno) => {
    const res = await axios.delete(`${host}/${tno}`)
    return res.data
}
