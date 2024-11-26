package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.*;
import com.positive.culture.seoulQuest.service.MemberService;
import com.positive.culture.seoulQuest.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/review")
@PreAuthorize("hasAnyRole('ROLE_USER')")
public class ReviewController {

    private final ReviewService reviewService;

    //리뷰 등록시 고객 닉네임과 주문한 item 조회 => product
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/products/info")
    public ReviewInfoDTO getInfoProduct(Principal principal){
        String email = principal.getName();
        ReviewInfoDTO reviewInfoDTO = reviewService.getProductPaymentInfo(email);
        System.out.println(reviewInfoDTO);
        return reviewInfoDTO;
    }

    //리뷰 등록시 고객 닉네임과 주문한 item 조회 => tour
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/tours/info")
    public ReviewInfoDTO getInfoTour(Principal principal){
        String email = principal.getName();
        ReviewInfoDTO reviewInfoDTO = reviewService.getTourPaymentInfo(email);
        System.out.println(reviewInfoDTO);
        return reviewInfoDTO;
    }

    @PostMapping("/products/")
    // product review 등록
    public Long registerProductReview(@RequestBody ReviewDTO reviewDTO){
        log.info(reviewDTO);

        Long productReviewId = reviewService.registerProductReview(reviewDTO);
        log.info(productReviewId);
        return productReviewId;
    }

    @PostMapping("/tours/")
    // tour review 등록
    public Long registerTourReview(@RequestBody ReviewDTO reviewDTO){
        log.info(reviewDTO);

        Long tourReviewId = reviewService.registerTourReview(reviewDTO);
        log.info(tourReviewId);
        return tourReviewId;
    }

    @GetMapping("/products/list")
    public PageResponseDTO<ReviewDTO> productReviewList(PageRequestDTO pageRequestDTO,
                                           @RequestParam String email) {
        log.info("list.......... PageRequestDTO: " + pageRequestDTO + ", email: " + email);

        return reviewService.getProductList(pageRequestDTO, email);
    }

    @GetMapping("/tours/list")
    public PageResponseDTO<ReviewDTO> tourReviewList(PageRequestDTO pageRequestDTO,
                                           @RequestParam(required = false) String email) {
        log.info("list.......... PageRequestDTO: " + pageRequestDTO + ", email: " + email);

        return reviewService.getTourList(pageRequestDTO, email);
    }

    //하나 조회
    @GetMapping("/products/{prid}")
    public ReviewDTO readProductReview(@PathVariable(name="prid") Long prid){
        System.out.println(prid);
        return reviewService.getProductReview(prid);
    }

    //하나 조회
    @GetMapping("/tours/{trid}")
    public ReviewDTO readTourReview(@PathVariable(name="trid") Long trid){
        System.out.println(trid);
        return reviewService.getTourReview(trid);
    }

    //리뷰 수정
    @PutMapping("/products/{prid}")
    public Map<String, String> modifyProductReview(@PathVariable(name="prid")Long prid, @RequestBody ReviewDTO reviewDTO){
        System.out.println("여기가 빈값" + reviewDTO);
        //수정작업
        reviewService.modifyProductReview(reviewDTO);
        return  Map.of("RESULT","SUCCESS");
    }

    //리뷰 수정
    @PutMapping("/tours/{trid}")
    public Map<String, String> modifyTourReview(@PathVariable(name="trid")Long trid, @RequestBody ReviewDTO reviewDTO){
        System.out.println("여기가 빈값" + reviewDTO);
        //수정작업
        reviewService.modifyTourReview(reviewDTO);
        return  Map.of("RESULT","SUCCESS");
    }

    //리뷰 삭제
    @DeleteMapping("/products/{prid}")
    public Map<String, String> deleteProductReview(@PathVariable("prid")Long prid){
        System.out.println("여기들어와야함 , " + prid);
        reviewService.removeProductReview(prid);
        return Map.of("RESULT","SUCCESS");
    }

    //리뷰 삭제
    @DeleteMapping("/tours/{trid}")
    public Map<String, String> deleteTourReview(@PathVariable("trid")Long trid){
        System.out.println("여기들어와야함 222, " + trid);
        reviewService.removeTourReview(trid);
        return Map.of("RESULT","SUCCESS");
    }

    //해당 상품에 대한 리뷰 조회
    @GetMapping("/products/list/{pno}")
    public List<ReviewDTO> getProductReviewList(@PathVariable("pno")Long pno){
        System.out.println("pno"+ pno);
        List<ReviewDTO> reviewDTOS =  reviewService.getProductReviewListForReadPage(pno);
        System.out.println("reviewDTOS" + reviewDTOS);
        return  reviewDTOS;
    }

    //해당 투어에 대한 리뷰 조회
    @GetMapping("/tours/list/{tno}")
    public List<ReviewDTO> getTourReviewList(@PathVariable("tno")Long tno){
        System.out.println("tno"+ tno);
        List<ReviewDTO> reviewDTOS =  reviewService.getTourReviewListForReadPage(tno);
        System.out.println("reviewDTOS" + reviewDTOS);
        return  reviewDTOS;
    }

}
