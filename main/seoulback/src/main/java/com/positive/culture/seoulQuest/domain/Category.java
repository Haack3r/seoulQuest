package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tbl_category")
@ToString(exclude = { "product", "tour" })
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    private String categoryName;
    private String categoryType; // product, tour 구분하기 위함

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Product> product = new ArrayList<>();

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Tour> tour = new ArrayList<>();

    // setter 사용대신 필드 수정위한 메서드 생성
    public void changeCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void changeCategoryType(String categoryType) {
        this.categoryType = categoryType;
    }

    public List<Product> getProductList() {
        return product;
    }

    public List<Tour> getTourList() {
        return tour;
    }
}
