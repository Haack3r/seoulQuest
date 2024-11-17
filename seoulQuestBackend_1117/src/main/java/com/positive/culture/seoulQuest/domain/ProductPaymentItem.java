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
    @JoinColumn(name = "paymentId")
    private ProductPayment productPayment;

    private String pname;
    private int pprice;
    private int pqty;

}
