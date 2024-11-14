package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
@Table(name = "tbl_tour_payment")
public class TourPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tpaymentId;

}
