package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import org.springframework.transaction.annotation.Transactional;

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
}
