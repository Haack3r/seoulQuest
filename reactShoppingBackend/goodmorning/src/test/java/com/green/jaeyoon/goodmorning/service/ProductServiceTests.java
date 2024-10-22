package com.green.jaeyoon.goodmorning.service;

import com.green.jaeyoon.goodmorning.dto.PageRequestDTO;
import com.green.jaeyoon.goodmorning.dto.PageResponseDTO;
import com.green.jaeyoon.goodmorning.dto.ProductDTO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest
@Log4j2
public class ProductServiceTests {

    @Autowired
    ProductService productService;

    @Test
    public void testList() {
        //1page, 10size
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().build();
        PageResponseDTO<ProductDTO> result = productService.getList(pageRequestDTO);
        result.getDtoList().forEach(dto -> log.info(dto));
    }

    //p219
    @Test
    public void testRegister() {
        ProductDTO productDTO = ProductDTO.builder()
                .pname("새로운 상품")
                .pdesc("신규 추가 상품")
                .price(1000)
                .build();

        // UUID가 있어야 함
        productDTO.setUploadFileNames(
                java.util.List.of(
                        UUID.randomUUID() + "_" + "Test1.jpg",
                        UUID.randomUUID() + "_" + "Test2.jpg"));
        productService.register(productDTO);
    }

    //p224
    @Test
    public void testRead() {
        Long pno = 102L;
        ProductDTO productDTO = productService.get(pno);
        log.info(productDTO);
        log.info(productDTO.getUploadFileNames());
    }
}
