package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "tbl_product")
@Getter
@ToString(exclude = { "productImageList", "category" })
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    private String pname;

    @Column(columnDefinition = "TEXT") // pdesc 타입을 text로 생성되도록 함
    private String pdesc;
    private int pprice;
    private int pqty;

    private int shippingFee;

    // 통계를 내거나 정보를 확인할 때 사용
    private LocalDate createAt; // 생성 일자
    private LocalDate updateAt; // 수정 일자

    private boolean delFlag; // 상품 삭제여부

    // 실행시 , 자동으로 product_image_list table이 생성됨.
    // 하나의 엔티티가 여러개의 VO(값타입 객체)를 담을때 사용, 자동으로 이에 해당하는 테이블이 생성됨
    @ElementCollection
    @Builder.Default
    private List<ProductImage> productImageList = new ArrayList<>();

    public void changeName(String pname) {
        this.pname = pname;
    }

    public void changeDesc(String pdesc) {
        this.pdesc = pdesc;
    }

    public void changePrice(int pprice) {
        this.pprice = pprice;
    }

    public void changeQuantity(int pqty) {
        this.pqty = pqty;
    }

    public void changeShippingFee(int shippingFee) {
        this.shippingFee = shippingFee;
    }

    public void changeCategory(Category category) {
        this.category = category;
    }

    @PrePersist
    public void prePersist() {
        this.createAt = this.createAt == null ? LocalDate.now() : this.createAt;
        this.updateAt = this.updateAt == null ? LocalDate.now() : this.updateAt;
    }

    @PreUpdate
    public void preUpdate() {
        this.updateAt = LocalDate.now();
    }

    public void changeDel(boolean delFlag) {
        this.delFlag = delFlag;
    }

    // ------------------------------------------------------
    // 이미지 정보 추가
    public void addImage(ProductImage productImage) {
        productImage.setOrd(this.productImageList.size());
        productImageList.add(productImage);
    }

    // 이미지 파일 이름 추가
    public void addImageString(String fileName) {
        ProductImage productImage = ProductImage.builder()
                .fileName(fileName)
                .build();
        addImage(productImage);
    }

    // productImage 리스트를 삭제
    public void clearList() {
        this.productImageList.clear();
    }

    // uploadFileNames getter 메서드
    public List<String> getUploadFileNames() {
        if (this.productImageList == null) {
            return new ArrayList<>();
        }
        return this.productImageList.stream()
                .map(ProductImage::getFileName)
                .filter(fileName -> fileName != null && !fileName.trim().isEmpty())
                .collect(Collectors.toList());
    }

    // uploadFileNames setter 메서드
    public void setUploadFileNames(List<String> fileNames) {
        clearList(); // 기존 리스트 초기화
        if (fileNames != null) {
            fileNames.stream()
                    .filter(fileName -> fileName != null && !fileName.trim().isEmpty())
                    .forEach(this::addImageString);
        }
    }
}
