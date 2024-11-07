package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DiscountType {
    // null값 허용을 위해 Integer 타입 사용
    private Integer percent;
    private Integer amount;
}
