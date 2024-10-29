package com.positive.culture.seoulQuest.dto;

import lombok.Data;

@Data
public class CartItemDTO {
    // 1. 장바구니에 상품 추가시 사용
    // 2. 장바구니 아이템 목록에서 상품 수량을 조정하는 경우 사용

    private Long cino;

    private String email;

    private Long pno;
    private int pqty;
}
