import { Children, useEffect, useState } from "react"
import jwtAxios from "../util/jwtUtil"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { getCookie } from "../util/cookieUtil"
import axios from "axios"
import { transform } from "framer-motion"

const host = `http://localhost:8080/api`

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

/* -------------------------- PRODUCT ------------------------------*/

// export const postProduct = async (product) => {
//     const header = { header: { "Content-Type": "multipart/form-data" } }
//     const res = await jwtAxios.post(`${host}/product`, product, header)
//     return res.data
// }

export const adminProductList = async ({ page, size, keyword = "", type = "t" }) => {
    try {
        const response = await jwtAxios.get(`${host}/admin/product`, {
            params: { page, size, keyword, type }
        });

        // 응답 데이터 검증
        if (!response || !response.data) {
            throw new Error('응답 데이터가 없습니다');
        }

        console.log("API 응답 상태:", response.status);
        console.log("API 응답 데이터:", response.data);

        return response.data;

    } catch (error) {
        // axios 에러인 경우
        if (error.response) {
            console.error('[API 에러]');
            console.error('상태:', error.response.status);
            console.error('데이터:', error.response.data);
            console.error('헤더:', error.response.headers);
        }
        // 요청 설정 에러인 경우
        else if (error.request) {
            console.error('[요청 에러]', error.request);
        }
        // 기타 에러
        else {
            console.error('[기타 에러]', error.message);
        }

        // 사용자 정의 에러 객체 throw
        throw {
            message: '상품 목록을 불러오는데 실패했습니다',
            status: error.response?.status,
            data: error.response?.data,
            originalError: error
        };
    }
};

export const getProduct = async (pno) => {
    const res = await jwtAxios.get(`${host}/admin/product/${pno}`)
    return res.data
}

// export const getProductImage = async (fileName) => {
//     const res = await jwtAxios.get(`${host}/admin/product/image/${fileName}`)
//     return res.data
// }

// 이미지 URL을 생성하는 함수 추가
// URL 로 저장하기 때문에 upload 폴더에 저장되지 않고 바로 접근 가능 (서로 장단점이 있음)

// export const getProductImage = async (fileName) => {
//     if (!fileName) return null;
//     try {
//         console.log("이미지 접근 시작:", `${host}/product/image/${fileName}`);
//         const response = await jwtAxios.get(`${host}/product/image/${fileName}`);
//         return response
//     } catch (error) {
//         console.error('이미지 접근 권한 없음:', error);
//         return null;
//     }
// };

// 이미지 삭제 API
export const deleteProductImage = async (pno, fileName) => {
    try {
        const response = await jwtAxios.delete(
            `${host}/admin/product/${pno}/image/${fileName}`
        );
        return response.data;
    } catch (error) {
        console.error('이미지 삭제 실패:', error);
        throw error;
    }
};

export const addProduct = async (formData) => {
    try {

        // jwtAxios 사용
        const response = await jwtAxios.post(
            `${host}/admin/product`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        console.log('Response:', response);
        return response.data;
    } catch (error) {
        console.error('상품 등록 실패:', error);
        throw error;
    }
};

export const deleteProduct = async (pno) => {
    try {
        const res = await jwtAxios.delete(`${host}/admin/product/${pno}`)
        return res.data
    } catch (error) {
        console.error('상품 삭제 오류', error)
        throw error
    }
}

export const modifyProduct = async (pno, formData) => {
    try {
        console.log('수정 요청 데이터:', {
            pno,
            formDataEntries: Array.from(formData.entries())
        });

        const response = await jwtAxios.put(
            `${host}/admin/product/${pno}`,  // URL에 pno 추가
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        );
        return response.data;
    } catch (error) {
        console.error('제품 수정 실패:', error);
        throw error;
    }
};

/* -------------------------- TOUR ------------------------------*/

export const adminTourList = async ({ page, size, keyword = "", type = "t" }) => {
    try {
        const res = await jwtAxios.get(`${host}/admin/tour`, {
            params: { page, size, keyword, type }
        })
        return res.data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const getTour = async (tno) => {
    try {
        const res = await jwtAxios.get(`${host}/admin/tour/${tno}`)
        return res.data
    } catch (err) {
        console.error('투어 정보 로드 실패 : ', err)
        throw err
    }
}

// 이미지 삭제 API
export const deleteTourImage = async (tno, fileName) => {
    try {
        const response = await jwtAxios.delete(
            `${host}/admin/tour/${tno}/image/${fileName}`
        );
        return response.data;
    } catch (error) {
        console.error('이미지 삭제 실패:', error);
        throw error;
    }
};

export const addTour = async (formData) => {
    try {
        const res = await jwtAxios.post(
            `${host}/admin/tour`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        return res.data
    } catch (err) {
        console.error('투어 등록 실패 : ', err)
        throw err;
    }
}

export const deleteTour = async (tno) => {
    try {
        const res = await jwtAxios.delete(`${host}/admin/tour/${tno}`)
        return res.data
    } catch (err) {
        console.error('투어 삭제 실패 : ', err)
        throw err
    }
}

export const modifyTour = async (tno, formData) => {
    try {
        console.log('- FormData check -')

        const res = await jwtAxios.put(
            `${host}/admin/tour/${tno}`, formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                transformRequest: [(data) => {
                    console.log('전송되는 데이터 : ', {
                        type: typeof data,
                        isFormData: data instanceof FormData,
                        entries: Array.from(data.entries())
                    })
                    return data
                }]
            }
        )

        console.log('수정 응답:', res.data);
        return res.data;
    } catch (error) {
        console.error('상품 수정 오류:', {
            message: error.message,
            response: error.response?.data
        });
        throw error;
    }
}

/* -------------------------- ORDER ------------------------------*/

export const fetchOrders = async () => {
    try {
        const res = await jwtAxios.get(`${host}/admin/order/list`)
        console.log("주문 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("주문 체크 오류", error)
        throw error
    }
}

/* -------------------------- RESERVATION ------------------------------*/

export const fetchReservations = async () => {
    try {
        const res = await jwtAxios.get(`${host}/admin/reservation/list`)
        console.log("상품 체크 응답", res)
        return res.data
    } catch (error) {
        console.log("상품 체크 오류", error)
        throw error
    }
}

/*---------------------------관리자 고객 문의-----------------------------*/

// 문의사항 목록 조회
export const getList = async () => {
    try {
        console.log("Fetching contact list");
        const res = await jwtAxios.get(`${host}/admin/contact/list`);
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

// 토큰을 가져오는 함수
const getToken = () => {
    return localStorage.getItem('token'); // 또는 세션에서 토큰을 가져오는 방식
};

export const updateReply = async (id, reply) => {
    try {
        console.log('Sending reply data:', { reply }); // 디버깅
        const response = await jwtAxios.put(`${host}/contact/${id}/reply`,
            { reply: reply },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Server response:', response.data); // 디버깅
        return response.data;
    } catch (error) {
        console.error('Error updating reply:', error.response?.data || error);
        throw error;
    }
};

export const saveTempReply = async (id, tempReply) => {
    try {
        console.log('Sending temp reply:', tempReply); // 디버깅
        const response = await jwtAxios.put(`${host}/contact/${id}/temp-reply`,
            { tempReply }, // 단순 문자열로 전송
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Save temp reply response:', response.data); // 디버깅
        return response.data;
    } catch (error) {
        console.error('Error saving temp reply:', error.response?.data || error);
        throw error;
    }
};

/* -------------------------- Coupon ------------------------------*/

export const fetchCoupons = async () => {
    try {
        console.log("쿠폰 목록 조회 시작");
        const res = await jwtAxios.get(`${host}/admin/coupon/list`);
        console.log("쿠폰 목록 응답:", res.data);
        return res.data;
    } catch (error) {
        console.error("쿠폰 목록 조회 에러:", error.response?.data || error);
        if (error.response?.status === 403) {
            alert("관리자 권한이 필요합니다.");
        }
        throw error;
    }
};

//추후 구현
// export const changeActive = async (couponId) => {
//     try {

//         // jwtAxios 사용
//         const response = await jwtAxios.post(
//             `${host}/admin/changeactive/${couponId}`,
//         );

//         console.log('Response:', response);
//         return response.data;
//     } catch (error) {
//         console.error('상품 등록 실패:', error);
//         throw error;
//     }
// };

/*--------------------------- CUSTOMER ------------------------------*/
export const getCustomerList = async () => {
    try {
        console.log("고객 목록 조회 시작");
        const res = await jwtAxios.get(`${host}/admin/customer/list`);
        console.log("고객 목록 응답:", res.data);
        return res.data;
    } catch (error) {
        console.error("고객 목록 조회 에러:", error.response?.data || error);
        if (error.response?.status === 403) {
            alert("관리자 권한이 필요합니다.");
        }
        throw error;
    }
};

export const getCustomerOrders = async (email) => {
    try {
        const response = await jwtAxios.get(`${host}/admin/customer/orders/${email}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        console.log("주문 데이터 응답:", response.data);
        return response.data;
    } catch (error) {
        console.error("주문 데이터 조회 실패:", error);
        if (error.response?.status === 401) {
            console.error("인증 에러 - 토큰을 확인하세요");
        }
        return [];
    }
};

export const getCustomerReservations = async (email) => {
    try {
        const response = await jwtAxios.get(`${host}/admin/customer/reservations/${email}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        console.log("예약 데이터 응답:", response.data);
        return response.data;
    } catch (error) {
        console.error("예약 데이터 조회 실패:", error);
        if (error.response?.status === 401) {
            console.error("인증 에러 - 토큰을 확인하세요");
        }
        return [];
    }
};
