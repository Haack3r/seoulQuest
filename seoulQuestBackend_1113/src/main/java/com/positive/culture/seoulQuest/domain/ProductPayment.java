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
    @JoinColumn
    private Member pPaymentMember;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private ProductOrder productOrder;

    private String merchantUid;

    private BigDecimal paymentPrice;
    private Date paymentDate;
    private String paymentStatus;

    @Builder.Default
    private String paymentMethod= "pending";
}
