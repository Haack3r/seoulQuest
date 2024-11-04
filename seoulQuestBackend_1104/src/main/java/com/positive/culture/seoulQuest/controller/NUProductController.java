package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.service.ProductService;
import com.positive.culture.seoulQuest.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/products")
@PreAuthorize("permitAll()")
public class NUProductController {
    private final CustomFileUtil fileUtil;
    private final ProductService productService;

    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> listNU(PageRequestDTO pageRequestDTO){
        log.info("list.........." + pageRequestDTO);
        return productService.getList(pageRequestDTO);
    }
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGetNU(@PathVariable String fileName){
        return fileUtil.getFile(fileName);
    }

    //단일 상품 조회 - test 성공 (유저, 관리자)
    @GetMapping("/{pno}")
    public ProductDTO readNU(@PathVariable(name="pno") Long pno){
        return productService.get(pno);
    }


    }

