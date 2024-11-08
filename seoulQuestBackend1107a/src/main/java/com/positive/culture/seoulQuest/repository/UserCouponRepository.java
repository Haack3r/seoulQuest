package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.UserCoupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserCouponRepository extends JpaRepository<UserCoupon,Long> {

    List<UserCoupon> findByCouponOwnerEmail(String email);

    @Query("SELECT uc FROM UserCoupon uc WHERE uc.couponOwner.email = :email AND uc.coupon.couponName = :couponName")
    UserCoupon findByEmailAndCouponName(@Param("email") String email, @Param("couponName") String couponName);
}
