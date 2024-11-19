package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.dto.ReviewDTO;
import com.positive.culture.seoulQuest.dto.ReviewInfoDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ReviewService {

    //유저 정보 조회(닉네임, 구매상품 또는 투어)
    public ReviewInfoDTO getProductPaymentInfo(String email);

    //목록

    //등록
//    public Long registerProductReview(ReviewDTO reviewDTO);

    //하나 조회

    //삭제

    //수정
}
