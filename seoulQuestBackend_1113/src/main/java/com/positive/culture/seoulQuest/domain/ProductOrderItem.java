package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "tbl_product_order_item")
@Builder
@Getter
public class ProductOrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pOrderItemId;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "cartItemId")
//    private CartItem cartItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_order_id")
    private ProductOrder productOrder;

    private Long pno;
    private String pname;
    private int pprice;
    private int pqty;

}
