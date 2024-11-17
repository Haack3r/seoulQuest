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
    @JoinColumn
    private Member tPaymentMember;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private TourOrder tourOrder;

    private String merchantUid;

    private BigDecimal paymentPrice;
    private Date paymentDate;
    private String paymentStatus;

    @Builder.Default
    private String paymentMethod= "pending";
}
