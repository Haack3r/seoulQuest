package com.positive.culture.seoulQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponDTO {
    private Long couponId;
    private String couponName;
    private int discount;
    private LocalDate expirationDate;
    private Boolean isActive;

    @Builder.Default
    private List<UserCouponDTO> userCouponList = new ArrayList<>();
}
