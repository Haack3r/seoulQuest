package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import com.positive.culture.seoulQuest.service.ProductService;
import com.positive.culture.seoulQuest.util.CustomFileUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api")

public class AdminController {
    private final CustomFileUtil fileUtil;
    private final ProductService productService;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    // @GetMapping("/")
    // public Map<String, Object> checkAdminAccess() {
    // log.info("admin access check...");
    // return Map.of("role", "ADMIN", "success", true);
    // }

    // 이미지 업로드 처리 (상품 등록/수정 시)
    private List<String> handleImageUpload(List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            return new ArrayList<>();
        }
        try {
            List<String> uploadFileNames = fileUtil.saveFiles(files);
            log.info("Uploaded files: " + uploadFileNames);
            return uploadFileNames;
        } catch (Exception e) {
            log.error("File upload error: ", e);
            throw new RuntimeException("파일 업로드 중 오류가 발생했습니다", e);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/check")
    public ResponseEntity<Map<String, Object>> checkAdmin() {
        return ResponseEntity.ok(Map.of(
                "role", "ADMIN",
                "status", "authorized"));
    }

    // admin product list 불러오기
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/product")
    public PageResponseDTO<ProductDTO> list(
            @RequestParam(required = false) String keyword,
            PageRequestDTO pageRequestDTO) {
        log.info("어드민 products list with keyword" + keyword);
        pageRequestDTO.setKeyword(keyword);
        return productService.getAdminProductList(pageRequestDTO);
    }

    // 이미지 파일 로드
    // @GetMapping("/product/{fileName}")
    // public ResponseEntity<Resource> viewFile(@PathVariable String fileName) {
    // return fileUtil.getFile(fileName);
    // }

    // @GetMapping("/random/view/**")
    // public ResponseEntity<Resource> viewFileGet(HttpServletRequest request) {
    // try {
    // String fileName = request.getRequestURI().split("/view/")[1];
    // log.info("요청된 URI: " + request.getRequestURI());
    // log.info("추출된 파일명: " + fileName);

    // ResponseEntity<Resource> response = fileUtil.getFile(fileName);
    // return response;
    // } catch (Exception e) {
    // log.error("이미지 로딩 중 에러 발생: ", e);
    // return ResponseEntity.notFound().build();
    // }
    // }

    @GetMapping("/admin/product/{pno}")
    public ProductDTO getOne(@PathVariable("pno") Long pno) {
        return productService.get(pno);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/product")
    @Transactional
    public Map<String, Long> register(@ModelAttribute ProductDTO productDTO) {
        log.info("register: " + productDTO);

        try {

            // 이미지 파일 처리
            List<String> uploadFileNames = handleImageUpload(productDTO.getFiles());

            // 카테고리 조회 및 생성 처리
            Category selectedCategory = categoryRepository
                    .findAllCategoriesList(productDTO.getCategoryName(), "product")
                    .orElseGet(() -> {
                        Category newCategory = Category.builder()
                                .categoryName(productDTO.getCategoryName())
                                .categoryType("product")
                                .build();
                        log.info("새로운 카테고리 생성: " + newCategory.getCategoryName());
                        return categoryRepository.save(newCategory);
                    });

            // // 파일 처리
            // List<MultipartFile> files = productDTO.getFiles();
            // if (files != null && !files.isEmpty()) {
            // List<String> uploadFileNames = fileUtil.saveFiles(files);
            // productDTO.setUploadFileNames(uploadFileNames);
            // log.info("Uploaded files: " + uploadFileNames);
            // }

            // // 카테고리가 없으면 예외 처리
            // if (categoryRepository.findAll().isEmpty()) {
            // selectedCategory = Category.builder()
            // .categoryName(productDTO.getCategoryName())
            // .build();
            // selectedCategory = categoryRepository.save(selectedCategory);
            // log.info("새로운 카테고리 생성: " + selectedCategory.getCategoryName());
            // } else {
            // selectedCategory = categoryRepository.findAll().get(0);
            // }

            // DTO를 엔티티로 변환
            Product product = Product.builder()
                    .pname(productDTO.getPname())
                    .pdesc(productDTO.getPdesc())
                    .pprice(productDTO.getPprice())
                    .pqty(productDTO.getPqty())
                    .shippingCost(productDTO.getShippingCost())
                    .category(selectedCategory)
                    .delFlag(false)
                    .build();

            // 이미지 파일명 설정
            uploadFileNames.forEach(product::addImageString);

            // // 이미지 파일명들 설정
            // if (productDTO.getUploadFileNames() != null) {
            // productDTO.getUploadFileNames().forEach(product::addImageString);
            // }

            // 저장
            Product savedProduct = productRepository.save(product);

            return Map.of("RESULT", savedProduct.getPno());
        } catch (Exception e) {
            log.error("상품 등록 중 에러 : " + e);
            throw e;
        }
    }

    // 이미지 조회 API 추가
    @GetMapping("/admin/product/image/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) {
        try {
            return fileUtil.getFile(fileName);
        } catch (Exception e) {
            log.error("이미지 조회 중 에러: ", e);
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/admin/product/{pno}")
    @Transactional
    public Map<String, Long> modify(
            @PathVariable("pno") Long pno,
            @ModelAttribute ProductDTO productDTO) {
        productDTO.setPno(pno);

        List<MultipartFile> files = productDTO.getFiles();
        if (files != null && !files.isEmpty()) {
            List<String> uploadFileNames = fileUtil.saveFiles(files);
            productDTO.setUploadFileNames(uploadFileNames);
        }

        productService.modify(productDTO);
        return Map.of("RESULT", pno);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
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
