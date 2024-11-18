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

// export const checkRoleWithData = async () => {
//     try {
//         const res = await jwtAxios.post(`${host}/admin`)
//         return res.data;
//     } catch (error) {
//         console.error("권한 체크 오류:", error);
//         throw error;
//     }
// }
