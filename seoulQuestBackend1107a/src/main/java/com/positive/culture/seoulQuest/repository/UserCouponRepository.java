package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.UserCoupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCouponRepository extends JpaRepository<UserCoupon,Long> {

    List<UserCoupon> findByCouponOwnerEmail(String email);
}
