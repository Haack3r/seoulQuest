package com.green.jaeyoon.goodmorning.controller;

import com.green.jaeyoon.goodmorning.dto.PageRequestDTO;
import com.green.jaeyoon.goodmorning.dto.PageResponseDTO;
import com.green.jaeyoon.goodmorning.dto.ProductDTO;
import com.green.jaeyoon.goodmorning.service.ProductService;
import com.green.jaeyoon.goodmorning.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/products")
@PreAuthorize("permitAll()")

public class ProductController {

    private final ProductService productService; // ProductService 주입
    private final CustomFileUtil fileUtil;

//    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')") // 임시 권한 설정
//    @PreAuthorize("hasRole('ROLE_ADMIN')") // 권한 설정
    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("list..." + pageRequestDTO);
        return productService.getList(pageRequestDTO);
    }

    @PostMapping("/")
    public Map<String, Long> register(ProductDTO productDTO) {
        log.info("register..." + productDTO);
        List<MultipartFile> files = productDTO.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        productDTO.setUploadFileNames(uploadFileNames);
        log.info(uploadFileNames);

        // 서비스 호출, 새로 등록된 상품 번호를 전송
        Long pno = productService.register(productDTO);
        return Map.of("result", pno);
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    @GetMapping("/{pno}")
    public ProductDTO read(@PathVariable(name="pno") Long pno) {
        //@PathVariable : 상품번호(pno)를 경로의 일부로 사용
        return productService.get(pno);
    }

    //p228
    @PutMapping("/{pno}")
    public Map<String, String> modify(@PathVariable(name="pno")Long pno, ProductDTO productDTO) {

        productDTO.setPno(pno);
        ProductDTO oldProductDTO = productService.get(pno);

        // 데이터 베이스에 존재하는 파일들(수정 과정에서 삭제되었을 수 있음)
        List<String> oldFileNames = oldProductDTO.getUploadFileNames();

        // 새로 업로드 하는 파일들
        List<MultipartFile> files = productDTO.getFiles();

        // 새로 업로드되어 만들어진 파일 이름들
        List<String> currentUploadFileNames = fileUtil.saveFiles(files);

        // 화면에서 변화 없이 계속 유지된 파일들
        List<String> uploadFileNames = productDTO.getUploadFileNames();

        // 저장해야 하는 파일 목록 : 유지되는 파일들 + 새로 업로드된 파일 이름들
        if(currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
            uploadFileNames.addAll(currentUploadFileNames);
        }

        // 수정 작업
        productService.modify(productDTO);

        if(oldFileNames != null && oldFileNames.size() > 0) {
            // 기존 파일들 중 지워져야 할 파일 목록 찾기
            List<String> removeFiles = oldFileNames.stream()
                    .filter(fileName -> uploadFileNames.indexOf(fileName) == -1)
                    // indexOf() 함수 : 검색 문자열이 첫번째로 나타나는 위치 index 리턴, 없으면 -1 리턴
                    .collect(Collectors.toList());

            // 실제 파일 삭제
            fileUtil.deleteFiles(removeFiles);
        }
        return Map.of("RESULT", "SUCCESS");
    }

    //p233
    @DeleteMapping("/{pno}")
    public Map<String, String> remove(@PathVariable("pno") Long pno) {

        // 삭제해야 할 파일명 찾기
        List<String> oldFileNames = productService.get(pno).getUploadFileNames();

        productService.remove(pno);
        fileUtil.deleteFiles(oldFileNames);
        return Map.of("RESULT", "SUCCESS");
    }
}
