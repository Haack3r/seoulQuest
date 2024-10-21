package com.positive.culture.seoulQuest.domain;

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
    private String tname;

    @Column(length = 10000)
    private String tdesc;
    private int tprice;
    private String tlocation;
    private int zipcode;
    private int seatRemain;
    private String tcategoryName;
    private LocalDate tDate;


    //통계를 내거나 정보를 확인할 때 사용
    private LocalDate createAt; //생성 일자
    private LocalDate updateAt; //수정 일자

    private boolean delFlag; //상품 삭제여부

    //실행시 , 자동으로 product_image_list table이 생성됨.
    //하나의 엔티티가 여러개의 VO(값타입 객체)를 담을때 사용, 자동으로 이에 해당하는 테이블이 생성됨
    @ElementCollection
    @Builder.Default
    private List<TourImage> tourImageList = new ArrayList<>();

    public void changeName(String tname){this.tname = tname;}
    public void changeDesc(String tdesc){this.tdesc = tdesc;}
    public void changePrice(int tprice){this.tprice=tprice;}
    public void changeLocation(String tlocation){this.tlocation=tlocation;}
    public void changeZipcode(int zipcode){this.zipcode=zipcode;}
    public void changeSeatRemain(int seatRemain){this.seatRemain=seatRemain;}
    public void changeCategoryName(String categoryName){this.tcategoryName = tcategoryName;}
    public void changeTDate(LocalDate tDate){this.tDate=tDate;}
    public void changeCreateAt(LocalDate createAt){this.createAt = createAt;}
    public void changeUpdateAt(LocalDate updateAt){this.updateAt = updateAt;}
    public void changeDel(boolean delFlag){this.delFlag =delFlag;}

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
