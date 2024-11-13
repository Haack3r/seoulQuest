package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Getter
@Entity
@Table(name = "tbl_payment")
public class PaymentRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Member paymentMember;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Order order;

    private String MerchantUid;

    private BigDecimal paymentPrice;
    private Date paymentDate;
    private String paymentStatus;

    @Builder.Default
    private String paymentMethod= "pending";
}
