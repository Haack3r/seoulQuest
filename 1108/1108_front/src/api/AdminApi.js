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

export const fetchCustomer = async () => {
    try {
        const res = await jwtAxios.get(`${host}/customer`)
        console.log("고객목록 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("고객목록 체크 오류", error.response || error)
        throw error
    }
}

export const fetchDelivery = async () => {
    try {
        const res = await jwtAxios.get(`${host}/delivery`)
        console.log("배송 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("배송 체크 오류", error.response || error)
        throw error
    }
}

export const fetchCost = async () => {
    try {
        const res = await jwtAxios.get(`${host}/cost`)
        console.log("배송비용 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("배송비용 체크 오류", error.response || error)
        throw error
    }
}

export const fetchExchange = async () => {
    try {
        const res = await jwtAxios.get(`${host}/exchange`)
        console.log("교환 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("교환 체크 오류", error.response || error)
        throw error
    }
}

export const fetchTour = async () => {
    try {
        const res = await jwtAxios.get(`${host}/tour`)
        console.log("투어 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("투어 체크 오류", error.response || error)
        throw error
    }
}

