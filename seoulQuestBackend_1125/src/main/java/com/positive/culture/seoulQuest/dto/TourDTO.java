package com.positive.culture.seoulQuest.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.domain.TourDate;
import com.positive.culture.seoulQuest.domain.TourImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data //DTO에는 GETTER와 SETTER가 있음
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TourDTO {
    private Long tno;
    private String tname;

    private String categoryName;
    private String categoryType;

    private String tdesc;
    private int tprice;
    private int maxCapacity;
    private String tlocation;
    private int likeCount;
    private String taddress;

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

    public TourDTO(Tour tour) {
        this.tno = tour.getTno();
        this.tname = tour.getTname();
        this.categoryName = tour.getCategory().getCategoryName(); // Access category name directly
        this.tdesc = tour.getTdesc();
        this.tprice = tour.getTprice();
        this.maxCapacity = tour.getMaxCapacity();
        this.tlocation = tour.getTlocation();
        this.taddress = tour.getTaddress();
        this.tDate = tour.getTDate(); // Assuming TourDate is directly compatible

        this.createAt = tour.getCreateAt();
        this.updateAt = tour.getUpdateAt();
        this.delFlag = tour.isDelFlag();

        // Extract file names from tourImageList
        this.uploadFileNames = tour.getTourImageList().stream()
                .map(TourImage::getFileName)
                .collect(Collectors.toList());
    }
}
