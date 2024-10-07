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
    private String category_name;
    private Long shipping_cost;
    private LocalDate create_at;
    private LocalDate update_at;
    private boolean delFlag; //상품 삭제여부

    @ElementCollection
    @Builder.Default
    private List<ProductImage> imageList = new ArrayList<>();

    public void changeName(String product_name){this.product_name = product_name;}

    public void changeDesc(String product_desc){this.product_desc = product_desc;}

    public void changePrice(int price){this.price=price;}

    public void changeQuantity(int quantity){this.quantity=quantity;}

    public void changeCategoryName(String category_name){this.category_name= category_name;}

    public Long changeShippingCost(int price, int quantity) {
        int totalPrice = price * quantity;
        if (totalPrice >= 50000) {
            return this.shipping_cost = 0l;
        } else {
            return this.shipping_cost = 2500l;
        }
    }

    public void changeCreateAt(LocalDate create_at){this.create_at = create_at;}
    public void changeUpdateAt(LocalDate update_at){this.update_at = update_at;}

    public void changeDel(boolean delFlag){this.delFlag =delFlag;}


}
