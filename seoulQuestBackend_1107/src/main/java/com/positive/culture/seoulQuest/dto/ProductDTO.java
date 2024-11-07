package com.positive.culture.seoulQuest.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data //DTO에는 GETTER와 SETTER가 있음
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long pno;
    private String categoryName;

    private String pname;
    private String pdesc; //상품설명
    private int pprice;
    private int pqty; //상품갯수
    private int shippingCost;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate createAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate updateAt;

    private boolean delFlag; //상품 삭제 여부
    private int likesCount;

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>(); //실제 업로드 한 파일 저장

    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<>(); //업로드한 파일들을 문자열로 저장
}
