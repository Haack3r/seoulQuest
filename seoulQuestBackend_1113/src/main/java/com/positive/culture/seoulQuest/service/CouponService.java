package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Coupon;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.UserCoupon;
import com.positive.culture.seoulQuest.dto.CouponDTO;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import jakarta.transaction.Transactional;

import java.util.List;


@Transactional
public interface CouponService {
    //이메일로 사용자의 정보와 쿠폰을 가져옴
    public OrderDTO getUserCouponAndUserInfo(String email);
    List<CouponDTO> getAvailableCoupons();
    void addCouponToUser(String email, Long couponId);
    List<CouponDTO> getUserCoupons(String email);
    public void markCouponAsUsed(Long userCouponId);



}
