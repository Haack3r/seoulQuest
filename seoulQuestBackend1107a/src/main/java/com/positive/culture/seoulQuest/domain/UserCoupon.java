package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"coupon", "couponOwner"})
@Builder
@Table(name = "tbl_user_coupon")
public class UserCoupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userCouponId;

    @JoinColumn(name = "coupon_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Coupon coupon;

    @JoinColumn(name = "member_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member couponOwner;

    private LocalDate useDate;
}
