package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Getter
@Entity
@Table(name = "tbl_product_payment")
public class ProductPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pPaymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_member_id")
    private Member pPaymentMember;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_order_id")
    private ProductOrder productOrder;

    private String merchantUid;

    private BigDecimal paymentPrice; //결제 총액
    private Date paymentDate;

//    @Builder.Default
//    private String paymentStatus= "pending";

    private String paymentMethod;
}
