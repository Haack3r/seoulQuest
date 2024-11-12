import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/admin`

export const checkRole = async () => {
    try {
        const res = await jwtAxios.get(`${host}`)
        console.log("권한 체크 응답", res) // 응답 확인 로그
        return res.data
    } catch (error) {
        console.log("권한 체크 오류", error.response || error)
        throw error
    }
}

export const fetchOrders = async () => {
    try {
        const res = await jwtAxios.get(`${host}/order`)
        console.log("주문 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("주문 체크 오류", error.response || error)
        throw error
    }
}

export const fetchProducts = async () => {
    try {
        const res = await jwtAxios.get(`${host}/product`)
        console.log("상품 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("상품 체크 오류", error.response || error)
        throw error
    }
}
export const fetchReservations = async () => {
    try {
        const res = await jwtAxios.get(`${host}/reservation`)
        console.log("상품 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("상품 체크 오류", error.response || error)
        throw error
    }
}