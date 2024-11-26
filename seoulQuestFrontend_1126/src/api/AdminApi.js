import { getCookie } from "../util/cookieUtil"
import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./reviewApi"

const host = `${API_SERVER_HOST}/api/admin`

// 관리자 권한 체크
export const checkAdminRole = async () => {
    try {
        // localStorage 체크
        // const user = JSON.parse(localStorage.getItem("user"))
        // if (!user?.role[1] === "ADMIN" || "ROLE_ADMIN") {
        //     throw new Error("관리자 권한이 없습니다")
        // } else setRole("ADMIN")

        // const user = JSON.parse(localStorage.getItem("user"))
        // if (!role === "ADMIN" || "ROLE_ADMIN") {
        //     throw new Error("관리자 권한이 없습니다")
        // } 

        const memberInfo = getCookie("member")
        if (!memberInfo) {
            throw new Error("로그인이 필요합니다")
        }
        const parsedMemberInfo = typeof memberInfo === 'string'
            ? JSON.parse(memberInfo)
            : memberInfo;

        console.log("memberInfo:", memberInfo)
        console.log("parsed memberInfo:", parsedMemberInfo)

        if (!parsedMemberInfo.role ||
            !parsedMemberInfo.role.includes("ADMIN")) {
            throw new Error("관리자 권한이 없습니다")
        }

        // API 체크
        const res = await jwtAxios.get(`${host}/admin/check`, {
            timeout: 5000
        })

        console.log("권한 체크 응답", res) // 응답 확인 로그

        return res.data
    } catch (error) {
        // 네트워크 에러일 경우 localStorage 정보만으로 진행
        if (error.code?.status === 302) {
            console.warn("네트워크 에러, cookie 권한으로 진행");
            return { role: ["ADMIN"] }; // localStorage 검증이 이미 완료됨
        }

        throw error;
    }
}

// 문의사항 목록 조회
export const getList = async () => {
    try {
        console.log("Fetching contact list");
        const res = await jwtAxios.get(`${host}/contact/list`);
        console.log("Contact list response:", res.data);
        return res.data;
    } catch (error) {
        console.error("Get List Error:", error.response?.data || error);
        if (error.response?.status === 403) {
            alert("관리자 권한이 필요합니다.");
        }
        throw error;
    }
}

// 답변 업데이트
export const updateReply = async (id, replyData) => {
    try {
        console.log("Sending reply data:", replyData);
        const res = await jwtAxios.put(`${host}/contact/${id}/reply`, replyData);
        return res.data;
    } catch (error) {
        console.error("Update Reply Error:", error);
        throw error;
    }
}

// 임시 답변 저장
export const saveTempReply = async (id, tempReplyData) => {
    try {
        console.log("Sending temp reply data:", tempReplyData);
        const res = await jwtAxios.put(`${host}/${id}/temp-reply`, tempReplyData);
        return res.data;
    } catch (error) {
        console.error("Save Temp Reply Error:", error);
        throw error;
    }
}