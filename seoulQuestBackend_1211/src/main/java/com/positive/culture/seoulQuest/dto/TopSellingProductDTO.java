package com.positive.culture.seoulQuest.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TopSellingProductDTO {
    private Long productId;
    private String productName;
    private int salesCount;
}
