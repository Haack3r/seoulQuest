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
public class ProductPaymentItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pPaymentItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_payment_id")
    private ProductPayment productPayment;

    private int pPaymentQty; //상품 결제 수량

    //Product엔티티와 연결

    //결제시의 상품 이름과 가격 정보
    private Long pno;
    private String pname;
    private int pprice;

}
