package com.positive.culture.seoulQuest.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.positive.culture.seoulQuest.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data // DTO에는 GETTER와 SETTER가 있음
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Long pno;

    private Long categoryId;
<<<<<<<< HEAD:seoulQuestBackend_1204/src/main/java/com/positive/culture/seoulQuest/dto/ProductDTO.java
    private String categoryName; // 카테고리 이름을 직접 받기 위한 필드
    private String categoryType; // 카테고리 타입을 직접 받기 위한 필드

    private String pname;
    private String pdesc; // 상품설명
========
    private String categoryName;
    private String categoryType;

    private String pname;
    private String pdesc; // 상품설명

>>>>>>>> 9a8d7082fbe27a3ecbe23c910a511149de75f013:main/bogeun/seoulback/src/main/java/com/positive/culture/seoulQuest/dto/ProductDTO.java
    private int pprice;
    private int pqty; // 상품갯수

    private int shippingFee;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate createAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate updateAt;

    private boolean delFlag; // 상품 삭제 여부

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>(); // 실제 업로드 한 파일 저장

    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<>(); // 업로드한 파일들을 문자열로 저장
}
