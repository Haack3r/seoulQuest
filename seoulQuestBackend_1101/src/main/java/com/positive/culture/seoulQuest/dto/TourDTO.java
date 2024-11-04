package com.positive.culture.seoulQuest.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.positive.culture.seoulQuest.domain.TourDate;
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
public class TourDTO {
    private Long tno;
    private String tname;

    private String categoryName;

    private String tdesc;
    private int tprice;
    private int max_capacity;
    private String tlocation;
    private int likeCount;

    @Builder.Default
    private List<TourDate> tDate = new ArrayList<>() ;

    //통계를 내거나 정보를 확인할 때 사용
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate createAt; //생성 일자
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate updateAt; //수정 일자

    private boolean delFlag; //상품 삭제 여부

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>(); //실제 업로드 한 파일 저장

    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<>(); //업로드한 파일들을 문자열로 저장
}
