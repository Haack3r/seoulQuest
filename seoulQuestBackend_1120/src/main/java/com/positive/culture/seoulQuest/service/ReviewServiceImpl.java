package com.positive.culture.seoulQuest.service;

import com.fasterxml.jackson.databind.cfg.MapperBuilder;
import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.dto.PaymentItemDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.dto.ReviewDTO;
import com.positive.culture.seoulQuest.dto.ReviewInfoDTO;
import com.positive.culture.seoulQuest.repository.*;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
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
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    //유저 닉네임, 구매 상품 찾음
    @Override
    public ReviewInfoDTO getProductPaymentInfo(String email) {

        //유저의 구매 목록 리스트
        List<ProductPayment> paymentList = productPaymentRepository.findByMemberEmail(email);

        //결제한 상품이 없는 멤버인 경우 빈 리스트로 반환
        if (paymentList.isEmpty()) {
            return ReviewInfoDTO.builder()
                    .email(email)
                    .paymentItemList(Collections.emptyList())
                    .build();
        }

        //결제 한 상품이 있는 경우
        List<ProductPaymentItem> paymentItemList= productPaymentItemRepository.findByProductPaymentIn(paymentList);

        List<PaymentItemDTO> paymentItemDTOList = paymentItemList.stream()
                .map(paymentItem-> PaymentItemDTO.builder()
                    .pno(paymentItem.getProduct().getPno())
                    .paymentItemId(paymentItem.getPPaymentItemId())
                    .pname(paymentItem.getPname())
                    .build()
        ).toList();

        return ReviewInfoDTO.builder()
                .email(email)
                .paymentItemList(paymentItemDTOList)
                .build();
    }

//    //리뷰 등록 - 상품
//    @Override
//    public Long registerProductReview(ReviewDTO reviewDTO) {
//
//        Long PaymentItemId = reviewDTO.getSelectedItemId();
//        Product Product = productRepository.findById()
//
//        ProductReview productReview = ProductReview.builder()
//                .product(reviewDTO.)
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
