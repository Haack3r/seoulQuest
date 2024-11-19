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
@Table(name = "tbl_tour_payment")
public class TourPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tPaymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member tPaymentMember;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "t_order_id")
    private TourOrder tourOrder;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_coupon_id")
    private UserCoupon usedCoupon;

    private String merchantUid;

    private BigDecimal paymentPrice; //결제 총액
    private Date paymentDate;

    private String paymentMethod;


}
