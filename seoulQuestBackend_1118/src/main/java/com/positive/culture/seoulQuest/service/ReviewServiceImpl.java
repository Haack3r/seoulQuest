package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.ProductPayment;
import com.positive.culture.seoulQuest.domain.ProductPaymentItem;
import com.positive.culture.seoulQuest.domain.ProductReview;
import com.positive.culture.seoulQuest.dto.ReviewDTO;
import com.positive.culture.seoulQuest.dto.ReviewInfoDTO;
import com.positive.culture.seoulQuest.repository.*;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
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
        String memberNickname = member.getNickName();

        //1. 멤버객체로 해당하는 모든 payment를 찾고
        //2. payment 들 로 paymentItemList 를 찾아서 이름을 List 로 만든 후, ReviewInfoDTO 에 userNickName과 함께 build

        List<ProductPayment> paymentList = productPaymentRepository.findByMember(member);

        //결제한 상품이 없는 멤버인 경우 빈 리스트로 반환
        if (paymentList.isEmpty()) {
            return ReviewInfoDTO.builder()
                    .nickName(memberNickname)
                    .pNameList(Collections.emptyList())
                    .build();
        }

        //모든 결제 상품 이름을 저장할 리스트
        List<String> AllPaymentItemNames = productPaymentItemRepository.findAllPnamesByPayments(paymentList);

        return ReviewInfoDTO.builder()
                .nickName(memberNickname)
                .pNameList(AllPaymentItemNames)
                .build();
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
