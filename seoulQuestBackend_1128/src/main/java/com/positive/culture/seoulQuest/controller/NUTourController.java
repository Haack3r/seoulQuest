package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.TourDTO;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.service.TourService;
import com.positive.culture.seoulQuest.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/tours")
@PreAuthorize("permitAll()")
public class NUTourController {
    private final CustomFileUtil fileUtil;
    private final TourService tourService;


    @GetMapping("/top")
    public List<TourDTO> getTopReservedTours(@RequestParam(defaultValue = "3") int limit) {
        return tourService.getTopReservedTours(limit);
    }
    //전체 목록 조회 - test 성공 (유저 , 관리자)
    @GetMapping("/list")
    public PageResponseDTO<TourDTO> list(PageRequestDTO pageRequestDTO, @RequestParam(required = false) String category) {
        log.info("list with category: {}", category != null ? category : "No category provided");
        return tourService.getListWithCategory(pageRequestDTO, category);
    }

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getTourCategories() {
        List<String> categories = categoryRepository.findByCategoryType("tour")
                .stream()
                .map(Category::getCategoryName)
                .collect(Collectors.toList());

        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(categories);
    }

    //업로드된 파일 보여주기 (유저, 관리자)
    //http://localhost:8080/api/products/view/파일명.파일형식 (upload폴더에 존재하는 파일)으로 접속하여 test-성공
    //URL로 파일 이름을 받아와서 fileUtil을 통해 파일을 유저에게 전송
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    //단일 상품 조회 - test 성공 (유저, 관리자)
    @GetMapping("/{tno}")
    public TourDTO read(@PathVariable(name = "tno") Long tno) {
        return tourService.get(tno);
    }

}
