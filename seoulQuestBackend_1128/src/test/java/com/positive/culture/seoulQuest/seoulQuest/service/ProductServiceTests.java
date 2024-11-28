package com.positive.culture.seoulQuest.seoulQuest.service;

import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.service.ProductService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.UUID;

@SpringBootTest
@Log4j2
public class ProductServiceTests { //서비스 계층 테스트
    @Autowired
    ProductService productService;

    @Test
    public void testList(){ //getList(전체 목록 조회) 테스트

        //1 page ,10 size
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().build();

        PageResponseDTO<ProductDTO> result = productService.getList(pageRequestDTO);

        result.getDtoList().forEach(dto->log.info(dto));
    }

    @Test
    public void testGetOne(){ //get(상품 하나 조회) 테스트

        //실제 존재하는 번호로 테스트
        Long pno=3l;

        //서비스 계층에서 repository를 통해 pno로 가져온 엔티티를 DTO로 변환하여 반환하는 get() 테스트
        ProductDTO productDTO =  productService.get(pno);

        log.info(productDTO);
        log.info(productDTO.getUploadFileNames());
    }

    @Test
    public void testRegister(){ //파일 등록 테스트 -ok
        ProductDTO productDTO = ProductDTO.builder()
                .pname("new product")
                .pdesc("this is new product")
                .pprice(1000)
                .build();

        productDTO.setUploadFileNames(List.of(UUID.randomUUID()+"_"+ "Test1.jpg",UUID.randomUUID()+"_"+"Test2.jpg"));
        productService.register(productDTO);
    }
}
