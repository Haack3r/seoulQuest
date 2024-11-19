package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import com.positive.culture.seoulQuest.service.ProductService;
import com.positive.culture.seoulQuest.util.CustomFileUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api")
@PreAuthorize("hasRole('ROLE_ADMIN')")

public class AdminController {
    private final CustomFileUtil fileUtil;
    private final ProductService productService;
    private final ProductRepository productRepository;

//    @GetMapping("/")
//    public Map<String, Object> checkAdminAccess() {
//        log.info("admin access check...");
//        return Map.of("role", "ADMIN", "success", true);
//    }

    @GetMapping("/admin/check")
    public ResponseEntity<Map<String, Object>> checkAdmin() {
        return ResponseEntity.ok(Map.of(
                "role", "ADMIN",
                "status", "authorized"
        ));
    }

    // admin product list 불러오기
    @GetMapping("/admin/product")
    public PageResponseDTO<ProductDTO> list(
            @RequestParam(required = false) String keyword,
            PageRequestDTO pageRequestDTO) {
        log.info("어드민 products list with keyword" + keyword);
        pageRequestDTO.setKeyword(keyword);
        return productService.getAdminProductList(pageRequestDTO);
    }

    // 이미지 파일 로드
//    @GetMapping("/product/{fileName}")
//    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) {
//        return fileUtil.getFile(fileName);
//    }

    @GetMapping("/random/view/**")
    public ResponseEntity<Resource> viewFileGet(HttpServletRequest request) {
        String fileName = request.getRequestURI().split("/view/")[1];  // Extract everything after "/view/"
        System.out.println("요청된 URI: " + request.getRequestURI());
        System.out.println("추출된 파일명: " + fileName);

        System.out.println("1000) fileName: " + fileName);
        System.out.println("응답 상태: " + fileUtil.getFile(fileName).getStatusCode());
        return fileUtil.getFile(fileName);
    }

    @GetMapping("/admin/product/{pno}")
    public ProductDTO getOne(@PathVariable("pno") Long pno) {
        return productService.get(pno);
    }

    @PostMapping("/admin/product")
    @Transactional
    public Map<String, Long> register(@ModelAttribute ProductDTO productDTO) {
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

        @Override
        public Long register(ProductDTO productDTO) {
            log.info("Product register.....");

            // DTO를 엔티티로 변환
            Product product = Product.builder()
                    .pname(productDTO.getPname())
                    .pdesc(productDTO.getPdesc())
                    .pprice(productDTO.getPprice())
                    .pqty(productDTO.getPqty())
                    .shippingCost(productDTO.getShippingCost())
                    .categoryName(productDTO.getCategoryName())
                    .categoryType(productDTO.getCategoryType())
                    .uploadFileNames(productDTO.getUploadFileNames())
                    .delFlag(false)
                    .build();

            // 저장
            Product savedProduct = productRepository.save(product);

            return savedProduct.getPno();
    }

    @PutMapping("/admin/product/{pno}")
    @Transactional
    public Map<String, Long> modify(
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

    @DeleteMapping("/admin/product/{pno}")
    @Transactional
    public Map<String, Long> remove(@PathVariable("pno") Long pno) {
        log.info("상품 삭제 (pno) : " + pno);
        // soft delete 처리
        try {
            productRepository.updateToDelete(pno, true);
            return Map.of("RESULT", pno);
        } catch (Exception e) {
            log.error("삭제 중 에러 : " + e);
            throw e;
        }
    }
}
