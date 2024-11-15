package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import com.positive.culture.seoulQuest.service.ProductService;
import com.positive.culture.seoulQuest.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")

public class AdminController {
    private final CustomFileUtil fileUtil;
    private final ProductService productService;
    private final ProductRepository productRepository;  // 추가

//    @GetMapping("/")
//    public Map<String, Object> checkAdminAccess() {
//        log.info("admin access check...");
//        return Map.of("role", "ADMIN", "success", true);
//    }

//    @GetMapping("/product")
//    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
//        log.info("list.........." + pageRequestDTO);
//        return productService.getList(pageRequestDTO);
//    }

//    @GetMapping("/product")
//    public ProductDTO
//    }

    @GetMapping("/product/{pno}")
    public ProductDTO getOne(@PathVariable("pno") Long pno) {
        Product product = productRepository.selectOne(pno)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Product 엔티티를 DTO로 변환
        return ProductDTO.builder()
                .pno(product.getPno())
                .categoryName(product.getCategory().getCategoryName())
                .pname(product.getPname())
                .pdesc(product.getPdesc())
                .pprice(product.getPprice())
                .pqty(product.getPqty())
                .shippingCost(product.getShippingCost())
                .createAt(product.getCreateAt())
                .updateAt(product.getUpdateAt())
                .delFlag(product.isDelFlag())
                .likesCount(product.getLikesCount())
                // 이미지 정보 변환
                .uploadFileNames(product.getProductImageList().stream()
                        .map(productImage -> productImage.getFileName())
                        .collect(Collectors.toList()))
                .build();
    }

    @PostMapping("/product")
    public Map<String,Long> register(@ModelAttribute ProductDTO productDTO) {
        log.info("register: " + productDTO);

        // 파일 처리
        List<MultipartFile> files = productDTO.getFiles();
        if (files != null && !files.isEmpty()) {
            List<String> uploadFileNames = fileUtil.saveFiles(files);
            productDTO.setUploadFileNames(uploadFileNames);
            log.info("Uploaded files: " + uploadFileNames);
        }
    
        // 서비스 호출
        Long pno = productService.register(productDTO);
        return Map.of("RESULT", pno);
    }

    @PutMapping("/product/{pno}")
    public Map<String,Long> modify(
            @PathVariable("pno") Long pno,
            @ModelAttribute ProductDTO productDTO
    ) {
        productDTO.setPno(pno);

        List<MultipartFile> files = productDTO.getFiles();
        if (files != null && !files.isEmpty()) {
            List<String> uploadFileNames = fileUtil.saveFiles(files);
            productDTO.setUploadFileNames(uploadFileNames);
        }

        productService.modify(productDTO);
        return Map.of("RESULT", pno);
    }

    @DeleteMapping("/product/{pno}")
    public Map<String,Long> remove(@PathVariable("pno") Long pno) {
        log.info("상품 삭제 (pno) : " + pno);
        // soft delete 처리
        try{
        productRepository.updateToDelete(pno, true);
        return Map.of("RESULT", pno);
        } catch (Exception e) {
            log.error("삭제 중 에러 : " +e );
            throw e;
        }
    }
}
