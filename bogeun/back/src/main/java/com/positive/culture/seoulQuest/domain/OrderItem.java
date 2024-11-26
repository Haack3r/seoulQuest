package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_order_item")
@Builder
@Getter
@ToString(exclude = "order")
@AllArgsConstructor
@NoArgsConstructor

public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemNo;

    @ManyToOne(fetch = FetchType.LAZY)
    private Order order;

    private String productName; // 상품 집접 저장
    private int quantity;
    private int price;
}
