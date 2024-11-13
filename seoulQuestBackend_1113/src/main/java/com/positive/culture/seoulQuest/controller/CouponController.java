package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Coupon;
import com.positive.culture.seoulQuest.dto.CouponDTO;
import com.positive.culture.seoulQuest.service.CouponService;
import com.positive.culture.seoulQuest.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("api/mypage/coupon")
public class CouponController {
    private final CouponService couponService;
    private final MemberService memberService;

    @GetMapping("/available")
    public List<CouponDTO> getAvailableCoupons() {
        return couponService.getAvailableCoupons();
    }

    @PostMapping("/add")
    public void addCouponToUser(@RequestParam String email, @RequestParam Long couponId) {
        couponService.addCouponToUser(email, couponId);
    }

    @GetMapping("/myCoupons")
    public List<CouponDTO> getUserCoupons(@RequestParam String email) {
        return couponService.getUserCoupons(email);
    }
}
