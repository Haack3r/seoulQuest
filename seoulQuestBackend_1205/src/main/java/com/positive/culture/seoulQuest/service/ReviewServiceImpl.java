package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.dto.*;
import com.positive.culture.seoulQuest.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class ReviewServiceImpl implements ReviewService {

    private final ProductReviewRepository productReviewRepository;
    private final MemberRepository memberRepository;
    private final TourReviewRepository tourReviewRepository;
    private final ProductPaymentRepository productPaymentRepository;
    private final ProductPaymentItemRepository productPaymentItemRepository;
    private final TourPaymentRepository tourPaymentRepository;
    private final TourPaymentItemRepository tourPaymentItemRepository;

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

        // 이미 리뷰 작성한 상품의 paymentItemId 목록
        List<Long> reviewedPaymentItemIds = productReviewRepository.findReviewedPaymentItemIdsByEmail(email);

        // 모든 결제 상품에서 리뷰 작성되지 않은 상품 필터링
        List<ProductPaymentItem> paymentItemList = productPaymentItemRepository.findByProductPaymentIn(paymentList)
                .stream().filter(item -> !reviewedPaymentItemIds.contains(item.getPPaymentItemId()))
                .toList();

        List<PaymentItemDTO> paymentItemDTOList = paymentItemList.stream()
                .map(paymentItem-> PaymentItemDTO.builder()
                    .paymentItemId(paymentItem.getPPaymentItemId())
                    .pname(paymentItem.getPname())
                    .build()
        ).toList();

        return ReviewInfoDTO.builder()
                .email(email)
                .paymentItemList(paymentItemDTOList)
                .build();
    }

    //유저 닉네임, 구매 투어 찾음
    @Override
    public ReviewInfoDTO getTourPaymentInfo(String email) {

        //유저의 구매 목록 리스트
        List<TourPayment> paymentList = tourPaymentRepository.findByMemberEmail(email);

        //결제한 상품이 없는 멤버인 경우 빈 리스트로 반환
        if (paymentList.isEmpty()) {
            return ReviewInfoDTO.builder()
                    .email(email)
                    .paymentItemList(Collections.emptyList())
                    .build();
        }

        // 이미 리뷰 작성한 상품의 paymentItemId 목록
        List<Long> reviewedPaymentItemIds = tourReviewRepository.findReviewedPaymentItemIdsByEmail(email);

        // 모든 결제 상품에서 리뷰 작성되지 않은 상품 필터링
        List<TourPaymentItem> paymentItemList = tourPaymentItemRepository.findByTourPaymentIn(paymentList)
                .stream().filter(item -> !reviewedPaymentItemIds.contains(item.getTPaymentItemId()))
                .toList();

        List<PaymentItemDTO> paymentItemDTOList = paymentItemList.stream()
                .map(paymentItem-> PaymentItemDTO.builder()
                        .paymentItemId(paymentItem.getTPaymentItemId())
                        .tname(paymentItem.getTname())
                        .build()
                ).toList();

        return ReviewInfoDTO.builder()
                .email(email)
                .paymentItemList(paymentItemDTOList)
                .build();
    }

    @Override
    public PageResponseDTO<ReviewDTO> getProductList(PageRequestDTO pageRequestDTO, String email) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("prid").descending());

        Page<ProductReview> result;

        if (email != null && !email.isEmpty()) {
            // 이메일 필터링
            result = productReviewRepository.findByMemberEmail(email, pageable);
        } else {
            // 전체 목록 조회
            result = productReviewRepository.findAll(pageable);
        }

        // Convert each ProductReview entity to a ReviewDTO
        List<ReviewDTO> dtoList = result.stream()
                .map(this::productReviewEntityChangeDTO)
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<ReviewDTO>withAll()
                .dtoList(dtoList) // reviewDTO 객체가 담겨있는 리스트
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    @Override
    public PageResponseDTO<ReviewDTO> getTourList(PageRequestDTO pageRequestDTO, String email) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("trid").descending());

        Page<TourReview> result;

        if (email != null && !email.isEmpty()) {
            // 이메일 필터링
            result = tourReviewRepository.findByMemberEmail(email, pageable);
        } else {
            // 전체 목록 조회
            result = tourReviewRepository.findAll(pageable);
        }

        // Convert each TourReview entity to a ReviewDTO
        List<ReviewDTO> dtoList = result.stream()
                .map(this::tourReviewEntityChangeDTO)
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<ReviewDTO>withAll()
                .dtoList(dtoList) // reviewDTO 객체가 담겨있는 리스트
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }


    //리뷰 등록 - 상품
    @Override
    public Long registerProductReview(ReviewDTO reviewDTO) {

        Long paymentItemId = reviewDTO.getSelectedItemId();
        ProductPaymentItem productPaymentItem = productPaymentItemRepository.findById(paymentItemId).orElseThrow();

        String email = reviewDTO.getEmail();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        ProductReview productReview = ProductReview.builder()
                .title(reviewDTO.getTitle())
                .product(productPaymentItem.getProduct())
                .productPaymentItem(productPaymentItem)
                .member(member)
                .rating(reviewDTO.getRating())
                .reviewContent(reviewDTO.getReviewContent())
                .build();

        productReviewRepository.save(productReview);
        return productReview.getPrid();
    }

    //리뷰 등록 - 투어
    @Override
    public Long registerTourReview(ReviewDTO reviewDTO) {

        Long paymentItemId = reviewDTO.getSelectedItemId();
        TourPaymentItem tourPaymentItem = tourPaymentItemRepository.findById(paymentItemId).orElseThrow();

        String email = reviewDTO.getEmail();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        TourReview tourReview = TourReview.builder()
                .title(reviewDTO.getTitle())
                .tour(tourPaymentItem.getTour())
                .tourPaymentItem(tourPaymentItem)
                .member(member)
                .rating(reviewDTO.getRating())
                .reviewContent(reviewDTO.getReviewContent())
                .build();

        tourReviewRepository.save(tourReview);
        return tourReview.getTrid();
    }

    //리뷰 하나 조회
    @Override
    public ReviewDTO getProductReview(Long prio) {
        ProductReview productReview = productReviewRepository.findById(prio).orElseThrow();
        ReviewDTO reviewDTO = ReviewDTO.builder()
                .itemName(productReview.getProductPaymentItem().getPname())
                .dueDate(productReview.getPostedDate())
                .reviewContent(productReview.getReviewContent())
                .title(productReview.getTitle())
                .nickName(productReview.getMember().getNickName())
                .rating(productReview.getRating())
                .prid(productReview.getPrid())
                .build();
        log.info(reviewDTO);
        return reviewDTO;
    }

    //리뷰 하나 조회
    @Override
    public ReviewDTO getTourReview(Long trio) {
        TourReview tourReview = tourReviewRepository.findById(trio).orElseThrow();
        ReviewDTO reviewDTO = ReviewDTO.builder()
                .itemName(tourReview.getTourPaymentItem().getTname())
                .dueDate(tourReview.getPostedDate())
                .reviewContent(tourReview.getReviewContent())
                .title(tourReview.getTitle())
                .nickName(tourReview.getMember().getNickName())
                .rating(tourReview.getRating())
                .trid(tourReview.getTrid())
                .build();
        log.info(reviewDTO);
        return reviewDTO;
    }

    @Override
    public void removeProductReview(Long prid) {
       productReviewRepository.deleteById(prid);
    }

    @Override
    public void removeTourReview(Long trid) {
        tourReviewRepository.deleteById(trid);
    }

    @Override
    public void modifyProductReview(ReviewDTO reviewDTO) {
        System.out.println("reviewDTO들어옴"+ reviewDTO.getTitle() + reviewDTO.getReviewContent() + reviewDTO.getRating());
        ProductReview productReview = productReviewRepository.findById(reviewDTO.getPrid()).orElseThrow();

        productReview.changeTitle(reviewDTO.getTitle());
        productReview.preUpdate();
        productReview.changeReviewContent(reviewDTO.getReviewContent());
        productReview.changeRating(reviewDTO.getRating());

        System.out.println(productReview);
        productReviewRepository.save(productReview);
    }

    @Override
    public void modifyTourReview(ReviewDTO reviewDTO) {
        System.out.println("reviewDTO들어옴"+ reviewDTO.getTitle() + reviewDTO.getReviewContent() + reviewDTO.getRating());
        TourReview tourReview = tourReviewRepository.findById(reviewDTO.getTrid()).orElseThrow();

        tourReview.changeTitle(reviewDTO.getTitle());
        tourReview.preUpdate();
        tourReview.changeReviewContent(reviewDTO.getReviewContent());
        tourReview.changeRating(reviewDTO.getRating());

        System.out.println(tourReview);
        tourReviewRepository.save(tourReview);
    }

    //Read page 에서 review 조회시 사용
    //1. product
    @Override
    public List<ReviewDTO> getProductReviewListForReadPage(Long pno) {
        List<ProductReview> productReviewList =productReviewRepository.findByProductPno(pno);
        System.out.println(productReviewList);

        return productReviewList.stream()
                .map(this::productReviewEntityChangeDTO)
                .toList();
    }
    //2. tour
    @Override
    public List<ReviewDTO> getTourReviewListForReadPage(Long tno) {
        List<TourReview> tourReviewList =tourReviewRepository.findByTourTno(tno);
        System.out.println(tourReviewList);

        return tourReviewList.stream()
                .map(this::tourReviewEntityChangeDTO)
                .toList();
    }

}
