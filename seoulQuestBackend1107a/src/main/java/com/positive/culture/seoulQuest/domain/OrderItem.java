package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "tbl_order_item")
@Builder
@Getter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn
//    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Order order;

    private String pname;
    private int pprice;
    private int pqty;

}
