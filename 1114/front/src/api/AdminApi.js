import { Children, useEffect, useState } from "react"
import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./todoApi"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { getCookie } from "../util/cookieUtil"

const host = `${API_SERVER_HOST}/api/admin`

// const memberInfo = getCookie("member");

// // AccessToken 가져오기 함수
// const getAccessToken = () => {
//     const accessToken = localStorage.getItem("accessToken")
//     if (!accessToken) {
//         throw new Error("No access token")
//     }
//     return accessToken
// }

// 기본 헤더 설정 함수
// const getHeaders = (isMultipart = false) => {
//     // const { accessToken } = memberInfo;
//     const token = getAccessToken()
//     const headers = {
//         'Authorization': `Bearer ${token}`
//     }

//     headers['Content-Type'] = isMultipart ?
//         'multipart/form-data' : 'application/json'

//     return { headers }
// }

// JWT 인터셉터 설정
// jwtAxios.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response?.status === 403 ||
//             error.response?.data?.error === 'ERROR_ACCESS_TOKEN') {
//             localStorage.removeItem('accessToken')
//             window.location.href = '/login'
//         }
//         return Promise.reject(error)
//     }
// )

// 관리자 권한 체크
export const checkAdminRole = async () => {
    try {
        // localStorage 체크
        const user = JSON.parse(localStorage.getItem("user"))
        if (!user?.role?.[1]) {
            throw new Error("관리자 권한이 없습니다")
        }

        // API 체크
        const res = await jwtAxios.get(`${host}/`, {
            headers: {
                "Content-Type": 'no - cache',
                'Content-Type': 'application/json'
            },
            timeout: 5000
        })

        console.log("권한 체크 응답", res) // 응답 확인 로그

        return res.data
    } catch (error) {
        // 네트워크 에러일 경우 localStorage 정보만으로 진행
        if (error.code === "ERR_NETWORK") {
            console.warn("네트워크 에러, localStorage 권한으로 진행");
            return { role: ["USER", "ADMIN"] }; // localStorage 검증이 이미 완료됨
        }

        throw error;
    }
}

// ADMIN 라우트
export const AdminRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        checkAdminRole()
            .then(() => setIsAdmin(true))
            .catch(() => navigate('/'))
            .finally(() => setLoading(false))
    }, [navigate])

    if (loading) return <Loader2 />
    return isAdmin ? children : null
}

// Admin API 함수들
/* -------------------------- ORDER ------------------------------*/

export const fetchOrders = async () => {
    try {
        const res = await jwtAxios.get(`${host}/order`)
        console.log("주문 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("주문 체크 오류", error)
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
            }
        })
        return res.data
    } catch (error) {
        console.error('상품 목록 조회 오류', error)
        throw error
    }
}

export const adminProductOne = async (pno) => {
    try {
        const res = await jwtAxios.get(`${host}/product/${pno}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const addProduct = async (formData) => {
    try {
        const res = await jwtAxios.post(
            `${host}/product`, formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        )
        return res.data
    } catch (error) {
        console.error('상품 등록 오류', error)
        throw error
    }
}

export const deleteProduct = async (pno) => {
    try {
        const res = await jwtAxios.delete(`${host}/product/${pno}`)
        return res.data
    } catch (error) {
        console.error('상품 삭제 오류', error)
        throw error
    }
}

export const modifyProduct = async (pno, formData) => {
    try {
        const res = await jwtAxios.put(`${host}/product/${pno}`, formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        )
        return res.data
    } catch (error) {
        console.error('상품 수정 오류', error)
        throw error
    }
}

/* -------------------------- RESERVATION ------------------------------*/

export const fetchReservations = async () => {
    try {
        const res = await jwtAxios.get(`${host}/reservation`)
        console.log("상품 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("상품 체크 오류", error)
        throw error
    }
}