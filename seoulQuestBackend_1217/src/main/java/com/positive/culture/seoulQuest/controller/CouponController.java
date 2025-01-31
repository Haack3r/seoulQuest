package com.positive.culture.seoulQuest.controller;

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
@CrossOrigin("*")
public class CouponController {
    private final CouponService couponService;
    private final MemberService memberService;

    @GetMapping("/available")
    public List<CouponDTO> getAvailableCoupons(@RequestParam String email) {
        System.out.println("Email received: " + email);
        List<CouponDTO> availableCoupons = couponService.getAvailableCoupons(email);
        System.out.println("Available Coupons: " + availableCoupons);
        return availableCoupons;
    }


    @PostMapping("/add/{email}")
    public void addCouponToUser(@PathVariable String email, @RequestParam Long couponId) {
        couponService.addCouponToUser(email, couponId);
    }

    @GetMapping("/myCoupons")
    public List<CouponDTO> getUserCoupons(@RequestParam String email) {
        return couponService.getUserCoupons(email);
    }
}
