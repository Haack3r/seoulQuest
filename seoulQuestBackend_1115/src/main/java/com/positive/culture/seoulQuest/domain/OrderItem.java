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
//    @JoinColumn(name = "cartItemId")
//    private CartItem cartItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderId")
    private Order order;

    private Long pno;
    private String pname;
    private int pprice;
    private int pqty;

}
