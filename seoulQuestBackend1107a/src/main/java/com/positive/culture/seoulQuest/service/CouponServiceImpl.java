package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.UserCoupon;
import com.positive.culture.seoulQuest.dto.CouponDTO;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.repository.UserCouponRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
@Log4j2
public class CouponServiceImpl implements CouponService{

    private final UserCouponRepository userCouponRepository;
    private final MemberRepository memberRepository;

    @Override
    public OrderDTO getUserCouponAndUserInfo(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<UserCoupon> userCoupons= userCouponRepository.findByCouponOwnerEmail(email);
        log.info(userCoupons);

        //userCoupon 엔티티리스트를  Coupon dto 리스트로 변경
        List<CouponDTO> couponDTOList = userCoupons.stream()
                //사용하지 않은 쿠폰만 가져옴
                .filter(userCoupon -> userCoupon.getUseDate() == null)
                .filter(userCoupon ->
                        //유효기간이 지나지 않은 쿠폰만 가져옴.
                        LocalDate.now().isBefore(userCoupon.getCoupon().getExpireDate()) || LocalDate.now().isEqual(userCoupon.getCoupon().getExpireDate())
                )
                .map(userCoupon->{
                    CouponDTO couponDTO = CouponDTO.builder()
                            .couponName(userCoupon.getCoupon().getCouponName())
                            .discount(userCoupon.getCoupon().getDiscount())
                            .build();
                    return couponDTO;
                }).toList();


        OrderDTO orderInfoDTO = OrderDTO.builder()
                .firstname(member.getFirstname())
                .lastname(member.getLastname())
                .country(member.getAddress().getCountry())
                .state(member.getAddress().getState())
                .city(member.getAddress().getCity())
                .street(member.getAddress().getStreet())
                .zipcode(member.getAddress().getZipCode())
                .phoneNumber(member.getPhoneNumber())
                .email(member.getEmail())
                .coupons(couponDTOList) //쿠폰 DTO 리스트를 넣음
                .build();
        return  orderInfoDTO;
    }
}
