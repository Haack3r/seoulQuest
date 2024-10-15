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
    private Long pno;
    private String pname;

    @Column(length = 10000)
    private String pdesc;
    private int price;
    private int quantity;
    private String categoryName;
    private Long shippingCost;

    //통계를 내거나 정보를 확인할 때 사용
    private LocalDate createAt; //생성 일자
    private LocalDate updateAt; //수정 일자

    private boolean delFlag; //상품 삭제여부

    //실행시 , 자동으로 product_image_list table이 생성됨.
    //하나의 엔티티가 여러개의 VO(값타입 객체)를 담을때 사용, 자동으로 이에 해당하는 테이블이 생성됨
    @ElementCollection
    @Builder.Default
    private List<ProductImage> imageList = new ArrayList<>();

    public void changeName(String pname){this.pname = pname;}
    public void changeDesc(String pdesc){this.pdesc = pdesc;}
    public void changePrice(int price){this.price=price;}
    public void changeQuantity(int quantity){this.quantity=quantity;}
    public void changeCategoryName(String categoryName){this.categoryName = categoryName;}
    public void changeShippingCost(Long shippingCost) {this.shippingCost = shippingCost;}
    public void changeCreateAt(LocalDate createAt){this.createAt = createAt;}
    public void changeUpdateAt(LocalDate updateAt){this.updateAt = updateAt;}
    public void changeDel(boolean delFlag){this.delFlag =delFlag;}

    //------------------------------------------------------
    //이미지 정보 추가
    public void addImage(ProductImage productImage){
        productImage.setOrd(this.imageList.size());
        imageList.add(productImage);
    }

    //이미지 파일 이름 추가
    public void addImageString(String fileName){
        ProductImage productImage = ProductImage.builder()
                .fileName(fileName)
                .build();
        addImage(productImage);
    }

    //productImage 리스트를 삭제
    public void clearList(){
        this.imageList.clear();
    }


}
