import axios from "axios"
import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/review`

export const getProductOne = async (prid) => { //review 하나 조회
    const res = await jwtAxios.get(`${prefix}/products/${prid}`)
    return res.data
}

export const getTourOne = async (trid) => { //review 하나 조회
    const res = await jwtAxios.get(`${prefix}/tours/${trid}`)
    return res.data
}

export const getProductList = async (pageParam) => { //reviewList 조회
    const { page, size, email } = pageParam;
    const res = await jwtAxios.get(`${prefix}/products/list`, { 
        params: { 
            page, 
            size, 
            email
        } 
    });
    return res.data;
};

export const getTourList = async (pageParam) => { //reviewList 조회
    const { page, size, email } = pageParam;
    const res = await jwtAxios.get(`${prefix}/tours/list`, { 
        params: { 
            page, 
            size, 
            email: email || null // email이 없으면 null로 처리
        } 
    });
    return res.data;
};

export const deleteProductOne = async (prid) => {   // 데이터 하나 삭제
    console.log(prid)
    const res = await jwtAxios.delete(`${prefix}/products/${prid}`)
    return res.data
}

export const deleteTourOne = async (trid) => {   // 데이터 하나 삭제
    console.log(trid)
    const res = await jwtAxios.delete(`${prefix}/tours/${trid}`)
    return res.data
}

export const putProductOne = async (review) => {     // 하나 수정
    console.log("review.prid",review.prid)

    const res = await jwtAxios.put(`${prefix}/products/${review.prid}`, review)
    return res.data
}

export const putTourOne = async (review) => {     // 하나 수정
    console.log("review.trid",review.trid)
  
    const res = await jwtAxios.put(`${prefix}/tours/${review.trid}`, review)
    return res.data
}

export const postProductAdd = async (reviewObj) => {     // 데이터 추가
    const res = await jwtAxios.post(`${prefix}/products/`, reviewObj)
    return res.data
}

export const postTourAdd = async (reviewObj) => {     // 데이터 추가
    const res = await jwtAxios.post(`${prefix}/tours/`, reviewObj)
    return res.data
}

//데이터 추가시 기본 정보 불러오기 
export const getInfoforProduct = async() =>{
    const res = await jwtAxios.get(`${prefix}/products/info`)
    return res.data
}

//데이터 추가시 기본 정보 불러오기 
export const getInfoforTour = async() =>{
    const res = await jwtAxios.get(`${prefix}/tours/info`)
    return res.data
}

//해당 상품에 대한 리뷰 불러오기
export const getProductItemReview = async(pno)=>{
    const res = await axios.get(`${prefix}/products/list/${pno}`)
    return res.data
}

//해당 투어에 대한 리뷰 불러오기
export const getTourItemReview = async(tno)=>{
    const res = await axios.get(`${prefix}/tours/list/${tno}`)
    return res.data
}