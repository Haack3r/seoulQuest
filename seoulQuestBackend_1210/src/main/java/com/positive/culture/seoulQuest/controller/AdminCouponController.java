package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.CouponDTO;
import com.positive.culture.seoulQuest.service.CouponService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin/coupon")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminCouponController {
    private final CouponService couponService;

    //쿠폰 조회
    @GetMapping("/list")
    public List<CouponDTO> couponDTOList(){return couponService.getCouponList();}

    //쿠폰 등록

    //쿠폰 active/inactive
//    @PostMapping("/changeactive/{couponId}")
//    public boolean changeActive(@Par)

    //쿠폰 삭제

}
