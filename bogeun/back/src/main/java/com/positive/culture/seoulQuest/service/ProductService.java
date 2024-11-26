package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
public interface ProductService {

    // 전체 조회
    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);

    // 전체 조회 ( 관리자 용 )
    PageResponseDTO<ProductDTO> getAdminProductList(PageRequestDTO pageRequestDTO);

    // delFlag ( 삭제 처리 ) = true 를 제외한 * 이미지가 있는 * 리스트 조회
    PageResponseDTO<ProductDTO> getAdminProductListNoImage(PageRequestDTO pageRequestDTO);

    // 하나 조회
    ProductDTO get(Long pno);

    // 등록
    Long register(ProductDTO productDTO);

    // 수정
    void modify(ProductDTO productDTO);

    // 삭제
    void remove(Long pno);

    // 이미지 삭제
    void removeProductImage(Long pno, String fileName);

    // DTO를 엔티티로 변환해주는 메서드 -> register에 사용
    default public Product dtoToEntity(ProductDTO productDTO, Category category) {
        Product product = Product.builder()
                .pno(productDTO.getPno())
                .category(category)
                .pname(productDTO.getPname())
                .pdesc(productDTO.getPdesc())
                .pprice(productDTO.getPprice())
                .pqty(productDTO.getPqty())
                .shippingFee(productDTO.getShippingFee())
                .createAt(productDTO.getCreateAt())
                .updateAt(productDTO.getUpdateAt())
                .delFlag(productDTO.isDelFlag())
                .build();

        // 업로드 처리가 끝난 파일들의 이름 리스트
        List<String> uploadFileNames = productDTO.getUploadFileNames();

        if (uploadFileNames == null) {
            return product;
        }

        uploadFileNames.stream().forEach(uploadNames -> {
            product.addImageString(uploadNames);
        });

        return product;
    }

    // 엔티티를 DTO로 변환해주는 메서드 -> getList와 get에 사용
    default public ProductDTO entityChangeDTO(Product product) {
        ProductDTO productDTO = ProductDTO.builder()
                .pno(product.getPno())
                .categoryName(product.getCategory().getCategoryName())
                .pname(product.getPname())
                .pdesc(product.getPdesc())
                .pprice(product.getPprice())
                .pqty(product.getPqty())
                .shippingFee(product.getShippingFee())
                .createAt(product.getCreateAt())
                .updateAt(product.getUpdateAt())
                .delFlag(product.isDelFlag())
                .build();

        // 이미지 정보 처리 - null 체크 추가 필요
        if (product.getUploadFileNames() != null && !product.getUploadFileNames().isEmpty()) {
            productDTO.setUploadFileNames(product.getUploadFileNames());
        } else {
            productDTO.setUploadFileNames(new ArrayList<>()); // 빈 배열로 초기화
        }

        return productDTO;
    }
}
