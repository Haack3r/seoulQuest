import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/review`

export const getOne = async (prid) => {  // 데이터 하나 조회
    const res = await jwtAxios.get(`${prefix}/${prid}`)
    return res.data
}

export const getList = async (pageParam) => {   // 전체 목록 조회
    const { page, size } = pageParam

    const res = await jwtAxios.get(`${prefix}/list`, { params: { page, size } })
    return res.data
}

export const deleteOne = async (prid) => {   // 데이터 하나 삭제
    const res = await jwtAxios.delete(`${prefix}/${prid}`)
    return res.data
}

export const putOne = async (review) => {     // 하나 수정
    const res = await jwtAxios.put(`${prefix}/${review.prid}`, review)
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

//해당 상품에 대한 리뷰 불러오기
export const getItemReview = async(pno)=>{
    const res = await jwtAxios.get(`${prefix}/products/${pno}`)
    return res.data
}