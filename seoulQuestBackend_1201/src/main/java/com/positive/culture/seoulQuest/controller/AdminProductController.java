package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import com.positive.culture.seoulQuest.service.ProductService;
import com.positive.culture.seoulQuest.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api")

public class AdminProductController {
    private final CustomFileUtil fileUtil;
    private final ProductService productService;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    // @GetMapping("/")
    // public Map<String, Object> checkAdminAccess() {
    // log.info("admin access check...");
    // return Map.of("role", "ADMIN", "success", true);
    // }

    // 어드민 권한 체크
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/check")
    public ResponseEntity<Map<String, Object>> checkAdmin() {
        return ResponseEntity.ok(Map.of(
                "role", "ADMIN",
                "status", "authorized"));
    }

    // 전체 상품 조회
    // @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/product")
    public PageResponseDTO<ProductDTO> list(
            @RequestParam(required = false) String keyword,
            PageRequestDTO pageRequestDTO) {
        log.info("어드민 products list with keyword" + keyword);
        pageRequestDTO.setKeyword(keyword);
        return productService.getAdminProductList(pageRequestDTO);
    }

    // admin product list 불러오기
    // @PreAuthorize("hasRole('ROLE_ADMIN')")
    // @GetMapping("/admin/product")
    // public PageResponseDTO<ProductDTO> list(
    // @RequestParam(required = false) String keyword,
    // PageRequestDTO pageRequestDTO) {
    // log.info("어드민 products list with keyword" + keyword);
    // pageRequestDTO.setKeyword(keyword);
    // return productService.getAdminProductList(pageRequestDTO);
    // }

    @GetMapping("/admin/product/{pno}")
    public ProductDTO getOne(@PathVariable("pno") Long pno) {
        return productService.get(pno);
    }

    // 상품 등록
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/product")
    @Transactional
    public Map<String, Long> register(@ModelAttribute ProductDTO productDTO) {
        log.info("register : " + productDTO);

        try {
            // 이미지 파일 처리
            List<MultipartFile> files = productDTO.getFiles();
            List<String> uploadFileNames = handleImageUpload(files);
            productDTO.setUploadFileNames(uploadFileNames);

            // 카테고리 처리
            if (productDTO.getCategoryName() != null && !productDTO.getCategoryName().isEmpty()) {
                Category category = Category.builder()
                        .categoryName(productDTO.getCategoryName())
                        .categoryType(productDTO.getCategoryType() != null ? productDTO.getCategoryType() : "product")
                        .build();

                // 카테고리 조회 또는 생성
                Category finalCategory = category; // final 변수로 새로 선언
                category = categoryRepository
                        .findAllCategoriesList(category.getCategoryName(), category.getCategoryType())
                        .orElseGet(() -> {
                            log.info("새로운 카테고리 생성: {}", finalCategory.getCategoryName());
                            return categoryRepository.save(finalCategory);
                        });

                productDTO.setCategoryId(category.getCategoryId());
                productDTO.setCategoryName(category.getCategoryName());
                productDTO.setCategoryType(category.getCategoryType());
            } else {
                log.warn("카테고리 이름이 없습니다.");
                throw new RuntimeException("카테고리 정보가 필요합니다.");
            }

            Long pno = productService.register(productDTO);
            return Map.of("RESULT", pno);

        } catch (Exception e) {
            log.error("상품 등록 중 에러 : {}", e.getMessage());
            throw e;
        }

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

        // 이미지 파일명 설정
        // uploadFileNames.forEach(productDTO::addImageString);

        // // 이미지 파일명들 설정
        // if (productDTO.getUploadFileNames() != null) {
        // productDTO.getUploadFileNames().forEach(product::addImageString);
        // }

        // 저장
        // Product savedProduct = productRepository.save(productDTO.toEntity());

        // 카테고리 설정
    }

    // 상품 수정
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/admin/product/{pno}")
    @Transactional
    public Map<String, String> modify(@PathVariable("pno") Long pno, @ModelAttribute ProductDTO productDTO) {
        log.info("ProductDTO: " + productDTO);
        productDTO.setPno(pno); // 값의 일관성을 보장하기 위해 pno를 다시 저장
        ProductDTO oldProductDTO = productService.get(pno); // pno로 기존 정보를 가져와서 저장

        try {
            // 기존의 파일들(DB에 존재하는 파일들)
            List<String> oldFileNames = oldProductDTO.getUploadFileNames();

            // 새로 업로드 해야하는 파일들
            List<MultipartFile> files = productDTO.getFiles();
            List<String> currentUploadFileNames = fileUtil.saveFiles(files);

            // 화면에서 유지된 파일들
            List<String> uploadedFileNames = productDTO.getUploadFileNames() != null ? productDTO.getUploadFileNames()
                    : new ArrayList<>();

            // 새로 업로드된 파일들 추가
            if (currentUploadFileNames != null && !currentUploadFileNames.isEmpty()) {
                uploadedFileNames.addAll(currentUploadFileNames);
            }

            // 카테고리 처리
            if (productDTO.getCategoryName() != null && !productDTO.getCategoryName().isEmpty()) {
                // 기존 카테고리 조회
                Category category = categoryRepository
                        .findAllCategoriesList(productDTO.getCategoryName(), "product")
                        .orElseGet(() -> {
                            log.info("새로운 카테고리 생성: {}", productDTO.getCategoryName());
                            // 기존 카테고리가 없으면 새로 생성
                            Category newCategory = Category.builder()
                                    .categoryName(productDTO.getCategoryName())
                                    .categoryType("product")
                                    .build();
                            return categoryRepository.save(newCategory);
                        });
                log.info("카테고리 정보: id={}, name={}, type={}",
                        category.getCategoryId(),
                        category.getCategoryName(),
                        category.getCategoryType());

                // Category 정보만 필요한 필드에 매핑
                productDTO.setCategoryId(category.getCategoryId());
                productDTO.setCategoryName(category.getCategoryName());
                productDTO.setCategoryType(category.getCategoryType());
            } else {
                // 카테고리 정보가 없는 경우 기존 카테고리 정보 유지
                ProductDTO oldProduct = productService.get(pno);
                productDTO.setCategoryId(oldProduct.getCategoryId());
                productDTO.setCategoryName(oldProduct.getCategoryName());
                productDTO.setCategoryType(oldProduct.getCategoryType());
            }

            // 기존 이미지 유지 처리
            productDTO.setUploadFileNames(uploadedFileNames);

            // 수정작업
            productService.modify(productDTO);

            // 삭제된 파일 처리
            if (oldFileNames != null && !oldFileNames.isEmpty()) {
                List<String> removedFiles = oldFileNames.stream()
                        .filter(fileName -> !uploadedFileNames.contains(fileName))
                        .collect(Collectors.toList());

                // 실제 파일 삭제
                if (!removedFiles.isEmpty()) {
                    fileUtil.deleteFiles(removedFiles);
                }
            }

            return Map.of("RESULT", "SUCCESS");
        } catch (Exception e) {
            log.error("상품 수정 중 에러: {}", e.getMessage());
            throw e;
        }
    }

    // 이미지 업로드 처리 (상품 등록/수정 시)
    private List<String> handleImageUpload(List<MultipartFile> files) {
        log.info("=== 이미지 업로드 처리 시작 ===");
        log.info("전달받은 파일 개수: " + (files != null ? files.size() : 0));

        if (files == null || files.isEmpty()) {
            log.warn("업로드할 파일이 없습니다.");
            return new ArrayList<>();
        }

        try {
            // 각 파일 정보 로깅
            files.forEach(file -> {
                log.info("파일명: " + file.getOriginalFilename());
                log.info("파일 크기: " + file.getSize());
                log.info("파일 타입: " + file.getContentType());
            });

            List<String> uploadFileNames = fileUtil.saveFiles(files);
            log.info("업로드된 파일명들: " + uploadFileNames);
            log.info("=== 이미지 업로드 처리 완료 ===");
            return uploadFileNames;
        } catch (Exception e) {
            log.error("=== 파일 업로드 중 에러 발생 ===");
            log.error("에러 메시지: " + e.getMessage());
            log.error("스택 트레이스: ", e);
            throw new RuntimeException("파일 업로드 중 오류가 발생했습니다", e);
        }
    }

    // 상품 삭제
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/admin/product/{pno}")
    @Transactional
    public Map<String, Long> remove(@PathVariable("pno") Long pno) {
        log.info("상품 삭제 (pno) : " + pno);

        // 삭제 해야할 파일들 알아내기
        List<String> oldFileNames = productService.get(pno).getUploadFileNames();
        try {
            productService.remove(pno);
            fileUtil.deleteFiles(oldFileNames);

            return Map.of("RESULT", pno);
        } catch (Exception e) {
            log.error("삭제 중 에러 : " + e);
            throw e;
        }
    }

    // 이미지 파일 로드
    @GetMapping("/product/image/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) {
        try {
            return fileUtil.getFile(fileName);
        } catch (Exception e) {
            log.error("이미지 로딩 중 에러 발생: ", e);
            return ResponseEntity.notFound().build();
        }
    }

    // 이미지 삭제
    // @DeleteMapping("/admin/product/image/{fileName}")
    // @PreAuthorize("hasRole('ROLE_ADMIN')")
    // public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
    // try {
    // fileUtil.deleteFiles(List.of(fileName));
    // return ResponseEntity.ok("File deleted successfully");
    // } catch (Exception e) {
    // log.error("파일 삭제 중 에러: ", e);
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    // .body("Failed to delete file");
    // }
    // }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/admin/product/{pno}/image/{fileName}")
    public ResponseEntity<String> removeProductImage(
            @PathVariable Long pno,
            @PathVariable String fileName) {
        try {
            productService.removeProductImage(pno, fileName);
            return ResponseEntity.ok("이미지가 성공적으로 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("이미지 삭제 실패: " + e.getMessage());
        }
    }

    // @GetMapping("/admin/product/image/**")
    // public ResponseEntity<Resource> viewFileGet(HttpServletRequest request) {
    // String fileName = request.getRequestURI().split("/admin/product/image/")[1];
    // // Extract everything after
    // // "/image/"
    // System.out.println("1000) fileName: " + fileName);
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

    // 이미지 조회 API 추가
    // @GetMapping("/product/image/{fileName}")
    // public ResponseEntity<Resource> viewFile(@PathVariable String fileName) {
    // try {
    // return fileUtil.getFile(fileName);
    // } catch (Exception e) {
    // log.error("이미지 조회 중 에러: ", e);
    // return ResponseEntity.notFound().build();
    // }
    // }

}
