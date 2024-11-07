package com.positive.culture.seoulQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponDTO {
    private String couponName;
    private String couponCode;
    private String amount;
    private String percent;
}
