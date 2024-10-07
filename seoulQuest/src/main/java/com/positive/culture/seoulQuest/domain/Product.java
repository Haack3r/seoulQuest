package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="tbl_product")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;
    private String product_name;
    private String product_desc;
    private int price;
    private int quantity;
    private Long catecory_id;
    private Long shipping_cost;
    private LocalDate create_at;
    private LocalDate update_at;

    private boolean delFlag; //상품 삭제여부

    @ElementCollection
    @Builder.Default
    private List<ProductImage> imageList = new ArrayList<>();

    public void changePrice(int price){
        this.price=price;
    }

    public void changeDesc(String product_desc){
        this.product_desc = product_desc;
    }



}
