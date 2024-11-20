package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.ProductReview;
import com.positive.culture.seoulQuest.dto.*;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ReviewService {

    //유저 정보 조회(닉네임, 구매상품 또는 투어)
    public ReviewInfoDTO getProductPaymentInfo(String email);

    //목록
    PageResponseDTO<ReviewDTO> getList(PageRequestDTO pageRequestDTO);

    //등록
    public Long registerProductReview(ReviewDTO reviewDTO);

    //하나 조회
    public ReviewDTO get(Long prio);

    //삭제

    //수정

    //엔티티를 DTO로 변환해주는 메서드  -> getList와 get에 사용
    default
    public ReviewDTO entityChangeDTO(ProductReview productReview){
        ReviewDTO reviewDTO = ReviewDTO.builder()
                .prid(productReview.getPrid())
                .reviewContent(productReview.getReviewContent())
                .rating(productReview.getRating())
                .title(productReview.getTitle())
                .nickName(productReview.getMember().getNickName())
                .itemName(productReview.getProductPaymentItem().getPname())
                .dueDate(productReview.getPostedDate())
                .build();
        return reviewDTO;
    }
}
