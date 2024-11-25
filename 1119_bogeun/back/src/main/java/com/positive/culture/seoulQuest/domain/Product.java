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
@ToString(exclude = "productImageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryNo", nullable = false)
    private Category category;

    private String pname;

    @Column(columnDefinition = "TEXT") // pdesc 타입을 text로 생성되도록 함
    private String pdesc;
    private int pprice;
    private int pqty;
    private int shippingCost;

    // 통계를 내거나 정보를 확인할 때 사용
    private LocalDate createAt; // 생성 일자
    private LocalDate updateAt; // 수정 일자

    private boolean delFlag; // 상품 삭제여부

    private int likesCount; // 좋아요 갯수

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

    public void changeShippingCost(int shippingCost) {
        this.shippingCost = shippingCost;
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

    public void changeLikeCount(int likesCount) {
        this.likesCount = likesCount;
    }

    // ------------------------------------------------------
    // 이미지 정보 추가
    public void addImage(ProductImage productImage) {
<<<<<<< HEAD
        // if (this.productImageList == null) {
        // this.productImageList = new ArrayList<>();
        // }
=======
>>>>>>> 123e949 (1)
        productImage.setOrd(this.productImageList.size());
        productImageList.add(productImage);
    }

    // 이미지 파일 이름 추가
    public void addImageString(String fileName) {
<<<<<<< HEAD
        // if (fileName != null && !fileName.trim().isEmpty()) {
=======
>>>>>>> 123e949 (1)
        ProductImage productImage = ProductImage.builder()
                .fileName(fileName)
                .build();
        addImage(productImage);
        // }
    }

    // productImage 리스트를 삭제
    public void clearList() {
<<<<<<< HEAD
        // if (this.productImageList != null) {
        // this.productImageList.clear();
        // }
        this.productImageList = new ArrayList<>();
=======
        this.productImageList.clear();
>>>>>>> 123e949 (1)
    }

    // uploadFileNames getter 메서드
    public List<String> getUploadFileNames() {
<<<<<<< HEAD
        if (this.productImageList == null) {
            return new ArrayList<>();
=======
        if (this.productImageList == null || this.productImageList.isEmpty()) {
            return new ArrayList<>(); // 빈 리스트 반환
>>>>>>> 123e949 (1)
        }
        return this.productImageList.stream()
                .map(ProductImage::getFileName)
                .filter(fileName -> fileName != null && !fileName.trim().isEmpty())
                .collect(Collectors.toList());
    }

    // uploadFileNames setter 메서드
    public void setUploadFileNames(List<String> fileNames) {
<<<<<<< HEAD
        clearList(); // 기존 리스트 초기화
        if (fileNames != null) {
            fileNames.stream()
                    .filter(fileName -> fileName != null && !fileName.trim().isEmpty())
                    .forEach(this::addImageString);
        }
=======
        fileNames.forEach(fileName -> {
            if (!this.getUploadFileNames().contains(fileName)) {
                this.addImageString(fileName);
            }
        });
>>>>>>> 123e949 (1)
    }

    // 기본 정보 변경을 위한 메서드 추가
    // public void changeBasicInfo(String pname, String pdesc, int pprice, int pqty,
    // int shippingCost) {
    // this.pname = pname;
    // this.pdesc = pdesc;
    // this.pprice = pprice;
    // this.pqty = pqty;
    // this.shippingCost = shippingCost;
    // this.updateAt = LocalDate.now(); // 수정 시간 업데이트
    // }
}
