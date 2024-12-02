import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/contact`

// 문의사항 등록 (ContactRequestDTO 구조에 맞춤)
export const postAdd = async (contactObj) => {
    try {
        const requestData = {
            name: contactObj.name,
            email: contactObj.email,
            inquiry: contactObj.inquiry
        };

        console.log("Sending contact data:", requestData);
        const res = await jwtAxios.post(`${prefix}/add`, requestData);
        return res.data;
    } catch (error) {
        console.error("Contact API Error:", error.response?.data || error);
        throw error;
    }
}

// // 문의사항 목록 조회
// export const getList = async () => {
//     try {
//         console.log("Fetching contact list");
//         const res = await jwtAxios.get(`${API_SERVER_HOST}/api/admin/contact/list`);
//         console.log("Contact list response:", res.data);
//         return res.data;
//     } catch (error) {
//         console.error("Get List Error:", error.response?.data || error);
//         if (error.response?.status === 403) {
//             alert("관리자 권한이 필요합니다.");
//         }
//         throw error;
//     }
// }

// // 답변 업데이트
// export const updateReply = async (id, replyData) => {
//     try {
//         console.log("Sending reply data:", replyData);
//         const res = await jwtAxios.put(`${API_SERVER_HOST}/api/admin/contact/${id}/reply`, replyData);
//         return res.data;
//     } catch (error) {
//         console.error("Update Reply Error:", error);
//         throw error;
//     }
// }

// // 임시 답변 저장
// export const saveTempReply = async (id, tempReplyData) => {
//     try {
//         console.log("Sending temp reply data:", tempReplyData);
//         const res = await jwtAxios.put(`${API_SERVER_HOST}/api/admin/contact/${id}/temp-reply`, tempReplyData);
//         return res.data;
//     } catch (error) {
//         console.error("Save Temp Reply Error:", error);
//         throw error;
//     }
// }