import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/admin`
// AccessToken 가져오기 함수
const getAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken")
    if (!accessToken) {
        throw new Error("No access token")
    }
    return accessToken
}

// 기본 헤더 설정 함수
const getHeaders = (isMultipart = false) => {
    const token = getAccessToken()
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    if (isMultipart) {
        headers['Content-Type'] = 'multipart/form-data'
    } else {
        headers['Content-Type'] = 'application/json'
    }


    return { headers }
}

export const checkRole = async () => {
    try {
        const res = await jwtAxios.get(`${host}`, getHeaders())
        console.log("권한 체크 응답", res) // 응답 확인 로그
        return res.data
    } catch (error) {
        if (error.response?.status === 403) {
            localStorage.removeItem("accessToken")
            throw new Error("관리자 권한이 없습니다")
        }
        console.log("권한 체크 오류", error.response || error)
        throw error
    }
}

/* -------------------------- ORDER ------------------------------*/

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

/* -------------------------- PRODUCT ------------------------------*/

// export const postProduct = async (product) => {
//     const header = { header: { "Content-Type": "multipart/form-data" } }
//     const res = await jwtAxios.post(`${host}/product`, product, header)
//     return res.data
// }

export const adminProductList = async ({ keyword = "", type = "t" }) => {
    try {
        const res = await jwtAxios.get(`${host}/product`, {
            params: {
                keyword,
                type,
            },
            headers: getHeaders().headers
        })
        return res.data
    } catch (error) {
        console.error('상품 목록 조회 오류', error)
        throw error
    }
}

export const adminProductOne = async (pno) => {
    try {
        const res = await jwtAxios.get(`${host}/product/${pno}`, getHeaders())
        return res.data
    } catch (error) {
        throw error
    }
}

export const addProduct = async (formData) => {
    try {
        const res = await jwtAxios.post(`${host}/product`, formData, getHeaders(true))
        return res.data
    } catch (error) {
        console.error('상품 등록 오류', error)
        throw error
    }
}

export const deleteProduct = async (pno) => {
    try {
        const res = await jwtAxios.delete(`${host}/product/${pno}`, getHeaders())
        return res.data
    } catch (error) {
        console.error('상품 삭제 오류', error)
        throw error
    }
}

export const modifyProduct = async (pno, formData) => {
    try {
        const res = await jwtAxios.put(`${host}/product/${pno}`, formData, getHeaders(true))
        return res.data
    } catch (error) {
        console.error('상품 수정 오류', error)
        throw error
    }
}


export const fetchReservations = async () => {
    try {
        const res = await jwtAxios.get(`${host}/reservation`, getHeaders())
        console.log("상품 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("상품 체크 오류", error)
        throw error
    }
}