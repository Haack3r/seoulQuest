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
    @JoinColumn(name = "t_order_id")
    private TourOrder tourOrder;

    private int tOrderQty; //투어 주문수량

    //투어 정보 수정될수 있으므로 주문당시 정보 따로 저장.
    private String tname;
    private Long tno;
    private int tprice;
    private LocalDate tdate;
}
