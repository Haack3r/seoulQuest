package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.domain.QTour;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.domain.TourDate;
import com.positive.culture.seoulQuest.domain.TourImage;
import com.positive.culture.seoulQuest.dto.*;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.repository.TourRepository;
import com.positive.culture.seoulQuest.util.CustomFileUtil;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.positive.culture.seoulQuest.domain.QCategory.category;

@Service
@Log4j2
@RequiredArgsConstructor // final이 적용된 필드에 대한 생성자 만들어줌
@Transactional
public class TourServiceImpl implements TourService {

    private final TourRepository tourRepository;
    private final CategoryRepository categoryRepository;
    private final CustomFileUtil fileUtil;

    // 전체 조회----(유저, 관리자)
    @Override
    public PageResponseDTO<TourDTO> getList(PageRequestDTO pageRequestDTO) {

        // Set up paging and sorting
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("tno").descending());

        // Create search filter using BooleanBuilder
        BooleanBuilder booleanBuilder = getSearch(pageRequestDTO);
        QTour qTour = QTour.tour;
        booleanBuilder.and(qTour.delFlag.eq(false));

        // Execute search query with the filter
        Page<Tour> result = tourRepository.findAll(booleanBuilder, pageable);

        // Convert each Tour entity to a TourDTO
        List<TourDTO> dtoList = result.stream()
                .map(tour -> entityChangeDTO(tour, tour.getCategory()))
                .collect(Collectors.toList());

        // Get the total number of items
        long totalCount = result.getTotalElements();

        // Build and return the PageResponseDTO
        return PageResponseDTO.<TourDTO>withAll()
                .dtoList(dtoList) // List of DTO objects
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    @Override
    public PageResponseDTO<TourDTO> getAdminTourList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("tno").descending());

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        QTour qTour = QTour.tour;
        booleanBuilder.and(qTour.delFlag.eq(false));

        // 키워드 검색
        if (pageRequestDTO.getKeyword() != null && !pageRequestDTO.getKeyword().trim().isEmpty()) {
            booleanBuilder.and(qTour.tname.contains(pageRequestDTO.getKeyword()))
                    .or(qTour.category.categoryName.contains(pageRequestDTO.getKeyword()));
        }

        Page<Tour> result = tourRepository.findAll(booleanBuilder, pageable);

        List<TourDTO> dtoList = result.getContent().stream()
                .map(tour -> {
                    // 각 상품에 대해 이미지 정보를 포함한 상세 정보 조회
                    Optional<Tour> tourWithImages = tourRepository.selectOne(tour.getTno());
                    Tour fullTour = tourWithImages.orElse(tour);

                    TourDTO dto = entityChangeDTO(fullTour, fullTour.getCategory());

                    // 이미지 정보 처리
                    List<TourImage> imageList = fullTour.getTourImageList();
                    if (imageList != null && !imageList.isEmpty()) {
                        List<String> fileNames = imageList.stream()
                                .map(TourImage::getFileName)
                                .collect(Collectors.toList());
                        dto.setUploadFileNames(fileNames);
                    } else {
                        dto.setUploadFileNames(new ArrayList<>());
                    }

                    return dto;
                })
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<TourDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }

    // 하나 조회---(유저, 관리자)
    @Override
    public TourDTO get(Long tno) {
        Optional<Tour> result = tourRepository.selectOne(tno);
        Tour tour = result.orElseThrow();
        TourDTO tourDTO = entityChangeDTO(tour, tour.getCategory());

        // 투어 날짜 정보 처리
        List<String> tourDates = tour.getTDate().stream()
                .map(date -> date.getTourDate().toString())
                .collect(Collectors.toList());
        tourDTO.setTDate(tourDates);

        // 이미지 처리
        List<TourImage> imageList = tour.getTourImageList();
        if (imageList == null || imageList.size() == 0)
            return tourDTO; // 이미지가 없는 상품인 경우

        List<String> fileNameList = imageList.stream()
                .map(tourImage -> tourImage.getFileName())
                .collect(Collectors.toList());
        tourDTO.setUploadFileNames(fileNameList);

        return tourDTO;
    }

    // //---------------------------------------------------------------

    // 등록 --(관리자)
    @Override
    @Transactional
    public Long register(TourDTO tourDTO) {
        Category category = categoryRepository
                .findByCategoryNameAndCategoryType(tourDTO.getCategoryName(), "tour");

        if (category == null) {
            category = Category.builder()
                    .categoryName(tourDTO.getCategoryName())
                    .categoryType("tour")
                    .build();
            category = categoryRepository.save(category);
        }
        
        Tour tour = dtoToEntity(tourDTO, category);
        Tour savedTour = tourRepository.save(tour);
        log.info("Saved tour: " + savedTour);
        
        return savedTour.getTno();
    }

    // ----------------------------------------------------------------
    // 수정 --(관리자)
    @Override
    @Transactional
    public void modify(TourDTO tourDTO) {
        // 1.read
        Optional<Tour> result = tourRepository.findById(tourDTO.getTno());
        Tour tour = result.orElseThrow();

        // 카테고리 찾기
        Category category = categoryRepository
                .findByCategoryNameAndCategoryType(tourDTO.getCategoryName(), "tour");

        if (category == null) {
            category = Category.builder()
                    .categoryName(tourDTO.getCategoryName())
                    .categoryType("tour")
                    .build();
            category = categoryRepository.save(category);
        }

        // 2.change basic info
        tour.changeCategory(category);

        tour.changeName(tourDTO.getTname());
        tour.changeDesc(tourDTO.getTdesc());
        tour.changePrice(tourDTO.getTprice());
        tour.changeMaxCapacity(tourDTO.getMaxCapacity());
        tour.changeAddress(tourDTO.getTaddress());
        tour.preUpdate();

        // 3.투어 날짜 정보 업데이트
        tour.getTDate().clear(); // 기존 날짜 정보 삭제
        if (tourDTO.getTDate() != null && !tourDTO.getTDate().isEmpty()) {
            tourDTO.getTDate().forEach(dateStr -> {
                TourDate tourDate = TourDate.builder()
                        .tour(tour)
                        .tourDate(LocalDate.parse(dateStr))
                        .availableCapacity(tourDTO.getMaxCapacity())
                        .build();
                tour.getTDate().add(tourDate);
            });
        }

        // 4.이미지 처리
        if (tourDTO.getFiles() != null && !tourDTO.getFiles().isEmpty()) {
            // 기존 이미지 삭제
            List<String> oldFiles = tour.getTourImageList()
                    .stream()
                    .map(TourImage::getFileName)
                    .collect(Collectors.toList());

            fileUtil.deleteFiles(oldFiles);
            tour.clearList();

            // 새 이미지 추가
            List<String> uploadFileNames = fileUtil.saveFiles(tourDTO.getFiles());
            uploadFileNames.forEach(tour::addImageString);
        }

        tourRepository.save(tour);
    }

    // ----------------------------------------------------------
    // 삭제 -- (관리자)
    @Override
    public void remove(Long tno) {
        tourRepository.updateToDelete(tno, true);
    }

    @Override
    public void removeTourImage(Long tno, String fileName) {
        tourRepository.deleteTourImage(tno, fileName);
        try {
            fileUtil.deleteFiles(List.of(fileName));
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException("이미지 파일 삭제 실패");
        }
    }

//    @Override
//    public List<TourDTO> getToursByLocation(String location) {
//        List<Tour> tours = tourRepository.findByTlocationContaining(location);
//        return tours.stream()
//                // .map(this::entityChangeDTO)
//                .map(tour -> entityChangeDTO(tour, tour.getCategory()))
//                .collect(Collectors.toList());
//    }

    @Override
    public List<TourDTO> getToursByAddress(String taddress) {
        List<Tour> tours = tourRepository.findByTaddress(taddress);
        return tours.stream()
                // .map(this::entityChangeDTO)
                .map(tour -> entityChangeDTO(tour, tour.getCategory()))
                .collect(Collectors.toList());
    }

    @Override
    public PageResponseDTO<TourDTO> getListWithCategory(PageRequestDTO pageRequestDTO, String category) {
        Pageable pageable = pageRequestDTO.getPageable(Sort.by("tno").descending());

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        QTour qTour = QTour.tour;

        // Base condition
        BooleanExpression expression = qTour.tno.gt(0L);
        booleanBuilder.and(expression);

        // Add category filter if provided
        if (category != null && !category.isEmpty()) {
            booleanBuilder.and(qTour.category.categoryName.eq(category));
        }

        // Add keyword search filter if provided
        if (pageRequestDTO.getKeyword() != null && !pageRequestDTO.getKeyword().isEmpty()) {
            String keyword = pageRequestDTO.getKeyword();
            BooleanBuilder keywordBuilder = new BooleanBuilder();
            keywordBuilder.or(qTour.tname.containsIgnoreCase(keyword)); // Match name
            keywordBuilder.or(qTour.tdesc.containsIgnoreCase(keyword)); // Match description
            booleanBuilder.and(keywordBuilder);
        }

        // Fetch data using combined filters
        Page<Tour> result = tourRepository.findAll(booleanBuilder, pageable);

        // Map to DTOs
        List<TourDTO> dtoList = result.stream()
                // .map(this::entityChangeDTO)
                .map(tour -> entityChangeDTO(tour, tour.getCategory()))
                .collect(Collectors.toList());

        // Build and return response
        return PageResponseDTO.<TourDTO>withAll()
                .dtoList(dtoList)
                .totalCount(result.getTotalElements())
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    private BooleanBuilder getSearch(PageRequestDTO requestDTO) {
        String type = requestDTO.getType();
        String keyword = requestDTO.getKeyword();
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        QTour qTour = QTour.tour;

        // Default condition: tno > 0 (return all tours)
        BooleanExpression expression = qTour.tno.gt(0L);

        // 삭제되지 않은 관광지만 조회
        booleanBuilder.and(expression);

        if (type == null || type.trim().isEmpty()) {
            return booleanBuilder;
        }

        // Add keyword-based filtering
        BooleanBuilder conditionBuilder = new BooleanBuilder();
        if (type.contains("t")) {
            conditionBuilder.or(qTour.tname.contains(keyword));
        }
        if (type.contains("c")) {
            conditionBuilder.or(qTour.category.categoryName.contains(keyword));
        }
        if (type.contains("w")) {
            conditionBuilder.or(qTour.taddress.contains(keyword));
        }
        booleanBuilder.and(conditionBuilder);

        return booleanBuilder;
    }

}
