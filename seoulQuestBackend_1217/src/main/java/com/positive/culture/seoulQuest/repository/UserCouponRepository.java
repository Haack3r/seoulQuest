package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Coupon;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.UserCoupon;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCouponRepository extends JpaRepository<UserCoupon,Long> {

    List<UserCoupon> findByCouponOwnerEmail(String email);

    //이메일과 쿠폰이름으로 user가 가지고 있는 쿠폰을 찾음. 같은 이름의 쿠폰이 있는경우 첫번째것을 사용
    //usedate가 null인것만 가져옴.
    UserCoupon findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(String email, String couponName);
    boolean existsByCouponAndCouponOwner(Coupon coupon, Member couponOwner);

    List<UserCoupon> findByCoupon(Coupon coupon);
}
