package com.positive.culture.seoulQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponDTO {
    private Long couponId;
    private String couponName;
    private int discount;
    private LocalDate expirationDate;
}
