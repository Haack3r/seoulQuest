package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.dto.TourDTO;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.service.TourService;
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

public class AdminTourController {
    private final CustomFileUtil fileUtil;
    private final TourService tourService;
    private final CategoryRepository categoryRepository;

    // @GetMapping("/admin/tour/check")
    // public Map<String, Object> checkAdminAccess() {
    // log.info("admin access check...");
    // return Map.of("role", "ADMIN", "success", true);
    // }

    // 전체 상품 조회
    // @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/tour")
    public PageResponseDTO<TourDTO> list(
            @RequestParam(required = false) String keyword,
            PageRequestDTO pageRequestDTO) {
        log.info("어드민 tours list with keyword" + keyword);
        pageRequestDTO.setKeyword(keyword);
        return tourService.getAdminTourList(pageRequestDTO);
    }

    // admin product list 불러오기
    // @PreAuthorize("hasRole('ROLE_ADMIN')")
    // @GetMapping("/admin/product")
    // public PageResponseDTO<ProductDTO> list(
    // @RequestParam(required = false) String keyword,
    // PageRequestDTO pageRequestDTO) {
    // log.info("어드민 products list with keyword" + keyword);
    // pageRequestDTO.setKeyword(keyword);
    // return tourService.getAdminProductList(pageRequestDTO);
    // }

    @GetMapping("/admin/tour/{tno}")
    public TourDTO getOne(@PathVariable("tno") Long tno) {
        return tourService.get(tno);
    }

    // 상품 등록
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/tour")
    @Transactional
    public Map<String, Long> register(@ModelAttribute TourDTO tourDTO) {
        log.info("register : " + tourDTO);

        try {
            // 이미지 파일 처리
            List<MultipartFile> files = tourDTO.getFiles();
            List<String> uploadFileNames = handleImageUpload(files);
            tourDTO.setUploadFileNames(uploadFileNames);

            // 카테고리 조회 및 생성 처리
            if (tourDTO.getCategoryName() != null && !tourDTO.getCategoryName().isEmpty()) {
                Category category = categoryRepository
                        .findAllCategoriesList(tourDTO.getCategoryName(), "tour")
                        .orElseGet(() -> {
                            Category newCategory = Category.builder()
                                    .categoryName(tourDTO.getCategoryName())
                                    .categoryType("tour")
                                    .build();
                            return categoryRepository.save(newCategory);
                        });

                tourDTO.setCategoryId(category.getCategoryId());
                tourDTO.setCategoryName(category.getCategoryName());
                tourDTO.setCategoryType(category.getCategoryType());
            }

            // 카테고리 처리
            if (tourDTO.getCategoryName() != null && !tourDTO.getCategoryName().isEmpty()) {
                Category category = Category.builder()
                        .categoryName(tourDTO.getCategoryName())
                        .categoryType(tourDTO.getCategoryType() != null ? tourDTO.getCategoryType() : "tour")
                        .build();

                // 카테고리 조회 또는 생성
                Category finalCategory = category; // final 변수로 새로 선언
                category = categoryRepository
                        .findAllCategoriesList(category.getCategoryName(), category.getCategoryType())
                        .orElseGet(() -> {
                            log.info("새로운 카테고리 생성: {}", finalCategory.getCategoryName());
                            return categoryRepository.save(finalCategory);
                        });

                tourDTO.setCategoryId(category.getCategoryId());
                tourDTO.setCategoryName(category.getCategoryName());
                tourDTO.setCategoryType(category.getCategoryType());
            } else {
                log.warn("카테고리 이름이 없습니다.");
                throw new RuntimeException("카테고리 정보가 필요합니다.");
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

            // tDate 데이터 로깅 추가
            log.info("Received tourDate: " + tourDTO.getTdate());

            // tourDate가 null이 아닌지 확인
            if (tourDTO.getTdate() == null) {
                tourDTO.setTdate(new ArrayList<>());
            }

            Long tno = tourService.register(tourDTO);
            log.info("Registered tour with tno: " + tno);

            return Map.of("RESULT", tno);
        } catch (Exception e) {
            log.error("투어 등록 중 에러: ", e);
            throw e;
        }
    }

    // 상품 수정
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/admin/tour/{tno}")
    @Transactional
    public Map<String, String> modify(@PathVariable("tno") Long tno, @ModelAttribute TourDTO tourDTO) {
        try {
            tourDTO.setTno(tno);

            // tDate 데이터 로깅 추가
            log.info("Modifying tour dates: " + tourDTO.getTdate());

            // tDate가 null이 아닌지 확인
            if (tourDTO.getTdate() == null) {
                tourDTO.setTdate(new ArrayList<>());
            }

            TourDTO oldTourDTO = tourService.get(tno);

            // 기존의 파일들( DB에 존재하는 파일들 - 수정과정에서 삭제되었을수 있음)
            List<String> oldFileNames = oldTourDTO.getUploadFileNames();

            // 새로 업로드 해야하는 파일들
            List<MultipartFile> files = tourDTO.getFiles();

            // 새로 업로드 되어서 만들어진 파일 이름들
            List<String> currentUploadFileNames = fileUtil.saveFiles(files);

            // 화면에서 유지된 파일들 (없으면 새 ArrayList 생성)
            List<String> uploadedFileNames = tourDTO.getUploadFileNames() != null ? tourDTO.getUploadFileNames()
                    : new ArrayList<>();

            // 새로 업로드된 파일들 추가
            if (currentUploadFileNames != null && !currentUploadFileNames.isEmpty()) {
                uploadedFileNames.addAll(currentUploadFileNames);
            }

            // 카테고리 처리
            if (tourDTO.getCategoryName() != null && !tourDTO.getCategoryName().isEmpty()) {
                // 기존 카테고리 조회
                Category category = categoryRepository
                        .findAllCategoriesList(tourDTO.getCategoryName(), "tour")
                        .orElseGet(() -> {
                            log.info("새로운 카테고리 생성: {}", tourDTO.getCategoryName());
                            // 기존 카테고리가 없으면 새로 생성
                            Category newCategory = Category.builder()
                                    .categoryName(tourDTO.getCategoryName())
                                    .categoryType("tour")
                                    .build();
                            return categoryRepository.save(newCategory);
                        });
                log.info("카테고리 정보: id={}, name={}, type={}",
                        category.getCategoryId(),
                        category.getCategoryName(),
                        category.getCategoryType());

                // Category 정보만 필요한 필드에 매핑
                tourDTO.setCategoryId(category.getCategoryId());
                tourDTO.setCategoryName(category.getCategoryName());
                tourDTO.setCategoryType(category.getCategoryType());
            } else {
                // 카테고리 정보가 없는 경우 기존 카테고리 정보 유지
                TourDTO oldTour = tourService.get(tno);
                tourDTO.setCategoryId(oldTour.getCategoryId());
                tourDTO.setCategoryName(oldTour.getCategoryName());
                tourDTO.setCategoryType(oldTour.getCategoryType());
            }

            // 기존 이미지 유지 처리
            tourDTO.setUploadFileNames(uploadedFileNames);

            // 수정작업
            tourService.modify(tourDTO);

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
            log.error("투어 수정 중 에러: ", e);
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
    @DeleteMapping("/admin/tour/{tno}")
    @Transactional
    public Map<String, Long> remove(@PathVariable("tno") Long tno) {
        log.info("상품 삭제 (tno) : " + tno);

        // 삭제 해야할 파일들 알아내기
        List<String> oldFileNames = tourService.get(tno).getUploadFileNames();
        try {
            tourService.remove(tno);
            fileUtil.deleteFiles(oldFileNames);

            return Map.of("RESULT", tno);
        } catch (Exception e) {
            log.error("삭제 중 에러 : " + e);
            throw e;
        }
    }

    // 이미지 파일 로드
    @GetMapping("/tour/image/{fileName}")
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
    @DeleteMapping("/admin/tour/{tno}/image/{fileName}")
    public ResponseEntity<String> removeTourImage(
            @PathVariable Long tno,
            @PathVariable String fileName) {
        try {
            tourService.removeTourImage(tno, fileName);
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
