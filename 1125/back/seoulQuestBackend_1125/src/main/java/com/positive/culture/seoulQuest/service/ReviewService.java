package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.ProductReview;
import com.positive.culture.seoulQuest.domain.TourReview;
import com.positive.culture.seoulQuest.dto.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ReviewService {

    //유저 정보 조회(닉네임, 구매상품)
    public ReviewInfoDTO getProductPaymentInfo(String email);

    //유저 정보 조회(닉네임, 구매투어)
    public ReviewInfoDTO getTourPaymentInfo(String email);

    //목록
    PageResponseDTO<ReviewDTO> getProductList(PageRequestDTO pageRequestDTO, String email);

    //목록
    PageResponseDTO<ReviewDTO> getTourList(PageRequestDTO pageRequestDTO, String email);

    //등록
    public Long registerProductReview(ReviewDTO reviewDTO);

    //등록
    public Long registerTourReview(ReviewDTO reviewDTO);

    //하나 조회
    public ReviewDTO getProductReview(Long prid);

    //하나 조회
    public ReviewDTO getTourReview(Long trid);

    //삭제
    public void removeProductReview(Long prid);

    //삭제
    public void removeTourReview(Long trid);

    //수정
    public void modifyProductReview(ReviewDTO reviewDTO);

    //수정
    public void modifyTourReview(ReviewDTO reviewDTO);

    //해당 상품에 대한 리뷰 조회
    public List<ReviewDTO> getProductReviewListForReadPage(Long pno);

    //해당 투어에 대한 리뷰 조회
    public List<ReviewDTO> getTourReviewListForReadPage(Long tno);

    //엔티티를 DTO로 변환해주는 메서드  -> getList와 get에 사용
    default
    public ReviewDTO productReviewEntityChangeDTO(ProductReview productReview){
        ReviewDTO reviewDTO = ReviewDTO.builder()
                .prid(productReview.getPrid())
                .email(productReview.getMember().getEmail())
                .reviewContent(productReview.getReviewContent())
                .rating(productReview.getRating())
                .title(productReview.getTitle())
                .nickName(productReview.getMember().getNickName())
                .itemName(productReview.getProductPaymentItem().getPname())
                .dueDate(productReview.getPostedDate())
                .build();
        return reviewDTO;
    }

    default
    public ReviewDTO tourReviewEntityChangeDTO(TourReview tourReview){
        ReviewDTO reviewDTO = ReviewDTO.builder()
                .trid(tourReview.getTrid())
                .email(tourReview.getMember().getEmail())
                .reviewContent(tourReview.getReviewContent())
                .rating(tourReview.getRating())
                .title(tourReview.getTitle())
                .nickName(tourReview.getMember().getNickName())
                .itemName(tourReview.getTourPaymentItem().getTname())
                .dueDate(tourReview.getPostedDate())
                .build();
        return reviewDTO;
    }
}
