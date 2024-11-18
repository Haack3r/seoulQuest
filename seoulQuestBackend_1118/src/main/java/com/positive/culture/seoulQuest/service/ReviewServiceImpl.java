package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.ProductPayment;
import com.positive.culture.seoulQuest.domain.ProductPaymentItem;
import com.positive.culture.seoulQuest.domain.ProductReview;
import com.positive.culture.seoulQuest.dto.ReviewDTO;
import com.positive.culture.seoulQuest.dto.ReviewInfoDTO;
import com.positive.culture.seoulQuest.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class ReviewServiceImpl implements ReviewService {

    private final ProductReviewRepository productReviewRepository;
    private final MemberRepository memberRepository;
    private final TourReviewRepository tourReviewRepository;
    private final ProductPaymentRepository productPaymentRepository;
    private final ProductPaymentItemRepository productPaymentItemRepository;

    //유저 닉네임, 구매 상품 찾음
    @Override
    public ReviewInfoDTO getProductPaymentInfo(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        //1. 멤버 아이디에 해당하는 payment를 모두 찾고,
        //2. payment

        List<ProductPaymentItem> productPaymentItemList = ProductPaymentItemRepository.findAllbyMemberId(member.getId());
        List<String> paymentItemNames = productPaymentItemList.stream().map(i->i.getPname()).toList();

        ReviewInfoDTO reviewInfodto = ReviewInfoDTO.builder()
                .nickName(member.getNickName())
                .pNameList(paymentItemNames)
                .build();


        return null;
    }

    //리뷰 등록 - 상품
//    @Override
//    public Long registerProductReview(ReviewDTO reviewDTO) {
//        ProductReview productReview = ProductReview.builder()
//                .product(reviewDTO.getProduct())
//                .member(reviewDTO.getMember())
//                .rating(reviewDTO.getRating())
//                .reviewContent(reviewDTO.getReviewContent())
//                .postedDate(reviewDTO.getPostedDate())
//                .build();
//
//        productReviewRepository.save(productReview);
//        return productReview.getPrid();
//    }

    //리뷰 등록 - 투어
}
