package com.positive.culture.seoulQuest.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "tbl_tours")
@Getter
@ToString(exclude = "tourImageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    private String tname;

    @Column(columnDefinition = "TEXT") // tdesc 타입을 text로 생성되도록 함
    private String tdesc;

    private int tprice;
    private int maxCapacity;
    private String tlocation;
    private String taddress;

    // 통계를 내거나 정보를 확인할 때 사용
    private LocalDate createAt; // 생성 일자
    private LocalDate updateAt; // 수정 일자

    private boolean delFlag; // 상품 삭제여부

    // 실행시 , 자동으로 product_image_list table이 생성됨.
    // 하나의 엔티티가 여러개의 VO(값타입 객체)를 담을때 사용, 자동으로 이에 해당하는 테이블이 생성됨
    @ElementCollection
    @Builder.Default
    private List<TourImage> tourImageList = new ArrayList<>();

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL) // TourDate 엔티티의 tour 필드와 매핑
    @Builder.Default
    @JsonManagedReference
    private List<TourDate> tDate = new ArrayList<>();

    public void changeCategory(Category category) {
        this.category = category;
    }

    public void changeName(String tname) {
        this.tname = tname;
    }

    public void changeAddress(String taddress) {
        this.taddress = taddress;
    }

    public void changeDesc(String tdesc) {
        this.tdesc = tdesc;
    }

    public void changePrice(int tprice) {
        this.tprice = tprice;
    }

    public void changeMaxCapacity(int maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    public void changeLocation(String tlocation) {
        this.tlocation = tlocation;
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
    public void addImage(TourImage tourImage) {
        tourImage.setOrd(this.tourImageList.size());
        tourImageList.add(tourImage);
    }

    // 이미지 파일 이름 추가
    public void addImageString(String fileName) {
        TourImage tourImage = TourImage.builder()
                .fileName(fileName)
                .build();
        addImage(tourImage);
    }

    // productImage 리스트를 삭제
    public void clearList() {
        this.tourImageList.clear();
    }

    // uploadFileNames getter 메서드
    public List<String> getUploadFileNames() {
        if (this.tourImageList == null) {
            return new ArrayList<>();
        }
        return this.tourImageList.stream()
                .map(TourImage::getFileName)
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