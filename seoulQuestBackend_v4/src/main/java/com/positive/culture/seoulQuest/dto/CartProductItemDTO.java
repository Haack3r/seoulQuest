package com.positive.culture.seoulQuest.dto;

import lombok.Data;

@Data
public class CartProductItemDTO {
    private Long cino;

    private String memberId;

    private Long pno;
    private int pqty;
    private int pprice;
}
