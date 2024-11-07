package com.positive.culture.seoulQuest.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="tbl_tours")
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
    @JoinColumn(name = "categoryNo", nullable = false)
    private Category category;

    private String tname;

    @Column(columnDefinition = "TEXT") // tdesc 타입을 text로 생성되도록 함
    private String tdesc;

    private int tprice;
    private int max_capacity;
    private String tlocation;

    //통계를 내거나 정보를 확인할 때 사용
    private LocalDate createAt; //생성 일자
    private LocalDate updateAt; //수정 일자

    private boolean delFlag; //상품 삭제여부
    private int likeCount; //좋아요 갯수

    //실행시 , 자동으로 product_image_list table이 생성됨.
    //하나의 엔티티가 여러개의 VO(값타입 객체)를 담을때 사용, 자동으로 이에 해당하는 테이블이 생성됨
    @ElementCollection
    @Builder.Default
    private List<TourImage> tourImageList = new ArrayList<>();

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL) //TourDate 엔티티의 tour 필드와 매핑
    @Builder.Default
    @JsonManagedReference
    private List<TourDate> tDate = new ArrayList<>() ;

    public void changeCategory(Category category){this.category = category;}
    public void changeName(String tname){this.tname = tname;}
    public void changeDesc(String tdesc){this.tdesc = tdesc;}
    public void changePrice(int tprice){this.tprice=tprice;}
    public void changeMaxCapacity(int max_capacity){this.max_capacity=max_capacity;}
    public void changeLocation(String tlocation){this.tlocation=tlocation;}

    @PrePersist
    public void prePersist() {
        this.createAt = this.createAt == null ? LocalDate.now() : this.createAt;
        this.updateAt = this.updateAt == null ? LocalDate.now() : this.updateAt;
    }

    @PreUpdate
    public void preUpdate() {
        this.updateAt = LocalDate.now();
    }

    public void changeDel(boolean delFlag){this.delFlag =delFlag;}
    public void changeLikeCount(int likeCount){this.likeCount = likeCount;}

    //------------------------------------------------------
    //이미지 정보 추가
    public void addImage(TourImage tourImage){
        tourImage.setOrd(this.tourImageList.size());
        tourImageList.add(tourImage);
    }

    //이미지 파일 이름 추가
    public void addImageString(String fileName){
        TourImage tourImage = TourImage.builder()
                .fileName(fileName)
                .build();
        addImage(tourImage);
    }

    //productImage 리스트를 삭제
    public void clearList(){
        this.tourImageList.clear();
    }


}
