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
    @JoinColumn(name = "t_payment_id")
    private TourPayment tourPayment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tno")
    private Tour tour;

    //결제시의 투어 이름과 가격, 예약 날짜 정보
    private String tname;
    private int tprice;
    private LocalDate tdate;

    private int tPaymentQty; //투어 결제 수량
}
