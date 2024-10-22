package com.positive.culture.seoulQuest.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor //기본 생성자만 생성
public class CartItemListDTO {
    private Long cino;

    // Tour 정보
    private String tname;
    private int tprice;
    private int tqty;
    private String timageFile;
    private LocalDate tDate;

    // Product 정보
    private String pname;
    private int pprice;
    private int pqty;
    private String pimageFile;

    // Projection 방식에서 사용할 product정보 생성자
    public CartItemListDTO(Long cino, String pname, int pprice, int pqty, String pimageFile) {
        this.cino = cino;
        this.pname = pname;
        this.pprice = pprice;
        this.pqty = pqty;
        this.pimageFile = pimageFile;
    }

    // Projection 방식에서 사용할 tour정보 생성자
    public CartItemListDTO(Long cino, String tname, int tprice, int tqty, String timageFile, LocalDate tDate) {
        this.cino = cino;
        this.tname = tname;
        this.tprice = tprice;
        this.tqty = tqty;
        this.timageFile = timageFile;
        this.tDate = tDate;
    }



//    //JPQL 이용해서 직접 DTO객체 생성하는 Projection이라는 방식을 이용하기 위하여 직접 생성자를 정의
//    public CartItemListDTO(Long cino, String tname, LocalDate tDate,
//                           String pname, int price, int qty, String imageFile){
//        this.cino= cino;
//        this.tname= tname;
//        this.tDate = tDate;
//        this.pname= pname;
//        this.price =price;
//        this.qty = qty;
//        this.imageFile = imageFile;
//    }
}
