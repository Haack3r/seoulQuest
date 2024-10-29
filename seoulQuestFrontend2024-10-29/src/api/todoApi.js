import axios from "axios"
import jwtAxios from "../util/jwtUtil"

// 여기에서 backend와 통신할 함수를 구현

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/todo`

export const getOne = async (tno) => {  // 데이터 하나 조회
    const res = await jwtAxios.get(`${prefix}/${tno}`)
    return res.data
}

export const getList = async (pageParam) => {   // 전체 목록 조회
    const { page, size } = pageParam

    const res = await jwtAxios.get(`${prefix}/list`, { params: { page, size } })
    return res.data
}

export const deleteOne = async (tno) => {   // 데이터 하나 삭제
    const res = await jwtAxios.delete(`${prefix}/${tno}`)
    return res.data
}

export const putOne = async (todo) => {     // 하나 수정
    const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo)
    return res.data
}

export const postAdd = async (todoObj) => {     // 데이터 추가
    const res = await jwtAxios.post(`${prefix}/`, todoObj)
    return res.data
}