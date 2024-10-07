package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Log4j2
@RequiredArgsConstructor //final이 적용된 필드에 대한 생성자 만들어줌
@Transactional
public class ProductServiceImpl implements ProductService{
    @Override
    public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO) {
        return null;
    }

    @Override
    public Long register(Product productDTO) {
        return 0l;
    }

    @Override
    public ProductDTO get(Long pno) {
        return null;
    }

    @Override
    public void modify(ProductDTO productDTO) {

    }

    @Override
    public void remove(Long pno) {

    }
}
