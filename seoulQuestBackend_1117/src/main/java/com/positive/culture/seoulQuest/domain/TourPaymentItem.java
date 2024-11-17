package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "tbl_tour_payment_item")
@Builder
@Getter
public class TourPaymentItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tPaymentItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paymentId")
    private TourPayment tourPayment;

    private String tname;
    private int tprice;
    private int tqty;
    private LocalDate tdate;

}
