package com.positive.culture.seoulQuest.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.ProductImage;
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
public class ProductDTO {
    private Long pno;
    private String categoryName;
    private String categoryType;

    private String pname;
    private String pdesc; //상품설명
    private int pprice;
    private int pqty; //상품갯수
    private int shippingFee;

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
    public ProductDTO(Product product) {
        this.pno = product.getPno();
        this.categoryName = product.getCategory().getCategoryName(); // Adjust as per your relationship
        this.categoryType = product.getCategory().getCategoryType(); // Adjust as needed
        this.pname = product.getPname();
        this.pdesc = product.getPdesc();
        this.pprice = product.getPprice();
        this.pqty = product.getPqty();
        this.shippingFee = product.getShippingCost();
        this.createAt = product.getCreateAt();
        this.updateAt = product.getUpdateAt();
        this.delFlag = product.isDelFlag();
        this.likesCount = product.getLikesCount();

        // Map the file names from productImageList
        this.uploadFileNames = product.getProductImageList()
                .stream()
                .map(ProductImage::getFileName) // Assuming ProductImage has a getFileName method
                .collect(Collectors.toList());
    }
}
