package com.green.jaeyoon.goodmorning.service;

import com.green.jaeyoon.goodmorning.dto.PageRequestDTO;
import com.green.jaeyoon.goodmorning.dto.PageResponseDTO;
import com.green.jaeyoon.goodmorning.dto.ProductDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional

public interface ProductService {

    // 전체 상품목록 조회
    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);

    // 상품 등록
    Long register(ProductDTO productDTO);

    // 단일 상품 조회
    ProductDTO get(Long pno);

    // 상품 정보 수정
    void modify(ProductDTO productDTO);

    // 상품 삭제
    void remove(Long pno);
}
