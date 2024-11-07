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
@ToString
@Builder
@Table(name = "tbl_coupon")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long couponId;

    private String couponName;
    private String couponCode;

    @Embedded
    private DiscountType discountType;

    private LocalDate expireDate;
    private boolean isActive;
}
