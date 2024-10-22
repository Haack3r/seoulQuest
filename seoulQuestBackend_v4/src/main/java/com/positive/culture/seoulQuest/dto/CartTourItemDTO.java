package com.positive.culture.seoulQuest.dto;

import lombok.Data;

@Data
public class CartTourItemDTO {
    private Long cino;

    private String memberId;

    private Long tno;
    private int tqty;
    private int tprice;

    private Long tourDateId;
}
