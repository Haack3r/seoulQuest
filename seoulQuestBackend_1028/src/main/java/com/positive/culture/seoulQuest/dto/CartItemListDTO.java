package com.positive.culture.seoulQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemListDTO {
    //특정 사용자의 장바구니에 포함된 상품의 정보들과 수량, 이미지 파일들을 목록으로 전달할때 사용
    private Long cino;

    private String email;

    // Product 정보
    private Long pno;
    private String pname;
    private int pprice;
    private int pqty;

    private String pfiles;
}
