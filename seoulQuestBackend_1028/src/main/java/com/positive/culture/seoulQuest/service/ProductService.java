package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Transactional
public interface ProductService {

    //전체 조회
    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);

    //하나 조회
    ProductDTO get(Long pno);

    //등록
    Long register(ProductDTO productDTO);

    //수정
    void modify(ProductDTO productDTO);

    //삭제
    void remove(Long pno);

    //DTO를 엔티티로 변환해주는 메서드 -> register에 사용
    default
    public Product dtoToEntity(ProductDTO productDTO){
        Product product =Product.builder()
                .pno(productDTO.getPno())
                .pname(productDTO.getPname())
                .pdesc(productDTO.getPdesc())
                .pprice(productDTO.getPprice())
                .pqty(productDTO.getPqty())
                .createAt(productDTO.getCreateAt())
                .updateAt(productDTO.getUpdateAt())
                .likesCount(productDTO.getLikesCount())
                .build();

        //업로드 처리가 끝난 파일들의 이름 리스트
        List<String> uploadFileNames = productDTO.getUploadFileNames();

        if(uploadFileNames== null){
            return product;
        }

        uploadFileNames.stream().forEach(uploadNames ->{
            product.addImageString(uploadNames);
        });

        return product;
    }

    //엔티티를 DTO로 변환해주는 메서드  -> getList와 get에 사용
    default
    public ProductDTO entityChangeDTO(Product product){
        ProductDTO productDTO = ProductDTO.builder()
                .pno(product.getPno())
                .categoryName(product.getCategory().getCategoryName())
                .pname(product.getPname())
                .pdesc(product.getPdesc())
                .pprice(product.getPprice())
                .shippingCost(product.getShippingCost())
                .pqty(product.getPqty())
                .createAt(product.getCreateAt())
                .createAt(product.getUpdateAt())
                .build();
        return productDTO;
    }
}
