// import axios from "axios"
import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/review`

export const getOne = async (no) => {  // 데이터 하나 조회
    const res = await jwtAxios.get(`${prefix}/${no}`)
    return res.data
}

export const getList = async (pageParam) => {   // 전체 목록 조회
    const { page, size } = pageParam

    const res = await jwtAxios.get(`${prefix}/list`, { params: { page, size } })
    return res.data
}

export const deleteOne = async (no) => {   // 데이터 하나 삭제
    const res = await jwtAxios.delete(`${prefix}/${no}`)
    return res.data
}

export const putOne = async (review) => {     // 하나 수정
    const res = await jwtAxios.put(`${prefix}/${review.no}`, review)
    return res.data
}

export const postAdd = async (reviewObj) => {     // 데이터 추가
    const res = await jwtAxios.post(`${prefix}/`, reviewObj)
    return res.data
}

//데이터 추가시 기본 정보 불러오기 
export const getInfoforProduct = async() =>{
    const res = await jwtAxios.get(`${prefix}/info`)
    return res.data
}