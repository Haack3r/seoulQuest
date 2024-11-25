package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "tbl_product_payment_item")
@Builder
@Getter
public class ProductPaymentItem { //하나의 결제 내역 상세

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pPaymentItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_payment_id")
    private ProductPayment productPayment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pno")
    private Product product;

    //결제시의 상품 이름과 가격 정보
    private String pname;
    private int pprice;

    private int pPaymentQty; //상품 결제 수량

}
