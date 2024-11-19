package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.dto.ReviewDTO;
import com.positive.culture.seoulQuest.dto.ReviewInfoDTO;
import com.positive.culture.seoulQuest.dto.UserDTO;
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
        System.out.println("principal:"+principal);
        String email = principal.getName();
        ReviewInfoDTO reviewInfoDTO = reviewService.getProductPaymentInfo(email);
        System.out.println(reviewInfoDTO);
        //email로 member닉네임과 주문상품이름 찾아서 ReviewInfoDTO에 저장하여 프론트로 전송
        return reviewInfoDTO;
    }

//    @PostMapping("/")
//    // product review 등록
//    public Long register(@RequestBody ReviewDTO reviewDTO){
//        log.info(reviewDTO);
//
//        Long prid = reviewService.registerProductReview(reviewDTO);
//        log.info(prid);
//        return prid;
//    }

}
