package com.positive.culture.seoulQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderPaymentItemDTO {
    //mypage에서 내 주문목록을 불러올때 사용, ordrePayment에 담아서 보냄
    //하나의 결제(Payment) 안의 상품들(products) or 투어들(tours)
    private String pname;
    private int pqty;
    private int pprice;

    private String tname;
    private int tqty;
    private int tprice;
    private LocalDate tdate;

}
