package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.CouponDTO;
import com.positive.culture.seoulQuest.service.CouponService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/list")
    public List<CouponDTO> couponDTOList(){return couponService.getCouponList();}

}
