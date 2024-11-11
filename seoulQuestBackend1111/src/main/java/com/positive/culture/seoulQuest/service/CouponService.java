package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.UserCoupon;
import com.positive.culture.seoulQuest.dto.CouponDTO;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import jakarta.transaction.Transactional;


@Transactional
public interface CouponService {
    //이메일로 사용자의 정보와 쿠폰을 가져옴
    public OrderDTO getUserCouponAndUserInfo(String email);


}
