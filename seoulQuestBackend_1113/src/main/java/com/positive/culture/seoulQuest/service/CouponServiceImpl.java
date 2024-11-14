package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Coupon;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.UserCoupon;
import com.positive.culture.seoulQuest.dto.CouponDTO;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.repository.CouponRepository;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.repository.UserCouponRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Log4j2
public class CouponServiceImpl implements CouponService {

    private final UserCouponRepository userCouponRepository;
    private final MemberRepository memberRepository;
    private final CouponRepository couponRepository;

    @Override
    public OrderDTO getUserCouponAndUserInfo(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<UserCoupon> userCoupons = userCouponRepository.findByCouponOwnerEmail(email);
        log.info(userCoupons);

        //userCoupon 엔티티리스트를  Coupon dto 리스트로 변경
        List<CouponDTO> couponDTOList = userCoupons.stream()
                //사용하지 않은 쿠폰만 가져옴
                .filter(userCoupon -> userCoupon.getUseDate() == null)
                .filter(userCoupon ->
                        //유효기간이 지나지 않은 쿠폰만 가져옴.
                        LocalDate.now().isBefore(userCoupon.getCoupon().getExpireDate()) || LocalDate.now().isEqual(userCoupon.getCoupon().getExpireDate())
                )
                .map(userCoupon -> {
                    CouponDTO couponDTO = CouponDTO.builder()
                            .couponName(userCoupon.getCoupon().getCouponName())
                            .discount(userCoupon.getCoupon().getDiscount())
                            .build();
                    return couponDTO;
                }).toList();

        System.out.println("이용가능한 쿠폰내역 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + couponDTOList);


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
        return orderInfoDTO;
    }

    @Override
    public List<CouponDTO> getAvailableCoupons() {
        return couponRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

//    @Override
//    public void addCouponToUser(String email, Long couponId) {
//        Member member = memberRepository.findByEmail(email).orElseThrow();
//        Coupon coupon = couponRepository.findById(couponId).orElseThrow();
//        UserCoupon userCoupon = new UserCoupon();
//        userCoupon.setCouponOwner(member);
//        userCoupon.setCoupon(coupon);
//        userCouponRepository.save(userCoupon);
//    }

    @Override
    public void addCouponToUser(String email, Long couponId) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new RuntimeException("Coupon not found"));

        log.info("Adding coupon {} to user {}", couponId, email);

        boolean couponAlreadyAdded = userCouponRepository
                .existsByCouponAndCouponOwner(coupon, member);

        if (couponAlreadyAdded) {
            throw new RuntimeException("Coupon already added for this user.");
        }
        UserCoupon userCoupon = UserCoupon.builder()
                .couponOwner(member)
                .coupon(coupon)
                .isActive(true)
                .build();
        userCouponRepository.save(userCoupon);
    }

    @Override
    public List<CouponDTO> getUserCoupons(String email) {
        return userCouponRepository.findByCouponOwnerEmail(email).stream()
                .filter(UserCoupon::isActive) // Only return active coupons
                .map(userCoupon -> convertToDTO(userCoupon.getCoupon()))
                .collect(Collectors.toList());
    }

    @Override
    public void markCouponAsUsed(Long userCouponId) {
        UserCoupon userCoupon = userCouponRepository.findById(userCouponId)
                .orElseThrow(() -> new RuntimeException("UserCoupon not found"));

        log.info("Marking coupon as used. UserCouponId: {}", userCouponId);

        userCoupon.setUseDate(LocalDate.now());
        userCoupon.setIsActive(false); // Set inactive

        userCouponRepository.save(userCoupon);

        log.info("Coupon marked as used. Active status: {}, Use Date: {}",
                userCoupon.isActive(), userCoupon.getUseDate());
    }



    private CouponDTO convertToDTO(Coupon coupon) {
        return CouponDTO.builder()
                .couponId(coupon.getCouponId())  // Ensure couponId is included
                .couponName(coupon.getCouponName())
                .discount(coupon.getDiscount())
                .expirationDate(coupon.getExpireDate())
                .build();
    }

}

