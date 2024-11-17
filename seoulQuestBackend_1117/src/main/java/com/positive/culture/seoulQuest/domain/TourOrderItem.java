package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
@Table(name = "tbl_tour_order_item")
public class TourOrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tOrderItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_order_id")
    private TourOrder tourOrder;

    private String tname;
    private Long tno;
    private int tprice;
    private int tqty;
    private LocalDate tdate;
}
