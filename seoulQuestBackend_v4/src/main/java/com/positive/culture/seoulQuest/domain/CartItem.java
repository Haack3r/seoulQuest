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
                    @Index(columnList = "tour_tno", name = "idx_touritem_tno_cart"),
                    @Index(columnList = "tour_date_id" , name = "idx_tourdateitem_no_cart"),
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

    @ManyToOne
    @JoinColumn(name = "tour_tno")
    private Tour tour;

    @ManyToOne
    @JoinColumn(name = "tour_date_id")
    private TourDate tourDate;

    @ManyToOne
    @JoinColumn(name = "product_pno")
    private Product product;

    private String itemType;

    private int qty;

    private int price;

    public void changeQuantity(int qty){
        this.qty = qty;
    }

    public void changePrice(int price){
        this.price =price;

    }
}
