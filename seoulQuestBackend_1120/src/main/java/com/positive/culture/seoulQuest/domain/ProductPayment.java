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
public class ProductPayment { //유저한명의 결제내역
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pPaymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member pPaymentMember;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_order_id")
    private ProductOrder productOrder;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_coupon_id")
    private UserCoupon usedCoupon;

    private String merchantUid;

    private int paymentPrice; //결제 총액
    private Date paymentDate;

    private String paymentMethod;
}
