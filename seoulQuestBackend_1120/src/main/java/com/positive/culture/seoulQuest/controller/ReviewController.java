package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.dto.*;
import com.positive.culture.seoulQuest.service.MemberService;
import com.positive.culture.seoulQuest.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService reviewService;
    private final MemberService memberService;

    //리뷰 등록시 고객 닉네임과 주문한 상품 or 투어 표시
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/info")
    public ReviewInfoDTO getInfo(Principal principal){
        String email = principal.getName();
        ReviewInfoDTO reviewInfoDTO = reviewService.getProductPaymentInfo(email);
        System.out.println(reviewInfoDTO);
        return reviewInfoDTO;
    }

    @PostMapping("/")
    // product review 등록
    public Long register(@RequestBody ReviewDTO reviewDTO){
        log.info(reviewDTO);

        Long productReviewId = reviewService.registerProductReview(reviewDTO);
        log.info(productReviewId);
        return productReviewId;
    }

    //전체 목록 조회
    @GetMapping("/list")
    public PageResponseDTO<ReviewDTO> list(PageRequestDTO pageRequestDTO){
        log.info("list.........." + pageRequestDTO);
        return reviewService.getList(pageRequestDTO);
    }

    //하나 조회
    @GetMapping("/{prid}")
    public ReviewDTO read(@PathVariable(name="prid") Long prid){
        return reviewService.get(prid);
    }

}
