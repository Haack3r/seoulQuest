package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.service.ProductService;
import com.positive.culture.seoulQuest.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/products")
@PreAuthorize("permitAll()")
public class NUProductController {
    private final CustomFileUtil fileUtil;
    private final ProductService productService;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getProductCategories() {
        List<String> categories = categoryRepository.findByCategoryType("product")
                .stream()
                .map(Category::getCategoryName)
                .collect(Collectors.toList());

        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO,
                                            @RequestParam(required = false) String category) {
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

