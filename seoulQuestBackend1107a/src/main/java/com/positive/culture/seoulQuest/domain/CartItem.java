package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="tbl_cart_item",
        indexes = {@Index(columnList = "cart_cno", name = "idx_cartitem_cart"),
                @Index(columnList = "product_pno, cart_cno", name="idx_cartitem_pno_cart"),
        }) //빠른 검색을 위해 인덱스를 추가함
@ToString(exclude = "cart")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cino;

    @ManyToOne
    @JoinColumn(name = "cart_cno")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_pno", nullable = false)
    private Product product;

    private int pqty;

    public void changeProductQuantity(int pqty){
        this.pqty = pqty;
    }
}
