package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.dto.*;
import com.positive.culture.seoulQuest.formatter.LocalDateFormatter;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
//import com.positive.culture.seoulQuest.repository.TourDateRepository;
import com.positive.culture.seoulQuest.repository.TourPaymentItemRepository;
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
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor // final이 적용된 필드에 대한 생성자 만들어줌
@Transactional
public class TourServiceImpl implements TourService {

    private final TourRepository tourRepository;
    private final CategoryRepository categoryRepository;
    private final CustomFileUtil fileUtil;
    private final TourPaymentItemRepository tourPaymentItemRepository;

    @Override
    public int getAvailable(Long tno, String selectedDate) {

        LocalDate targetDate = LocalDate.parse(selectedDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        Tour tour = tourRepository.findById(tno).orElseThrow();
        TourDate tourDate = tour.getTourDateList().stream()
                .filter(date -> date.getTourDate().equals(targetDate))
                .findFirst().orElseThrow();

        return tourDate.getAvailableCapacity();
    }

    @Override
    public List<TourDTO> getTopReservedTours(int limit) {
        return tourPaymentItemRepository.findTopReservedTours().stream()
                .limit(limit) // Limit the results
                .map(obj -> TourDTO.builder()
                        .tno((Long) obj[0]) // Tour ID
                        .tname((String) obj[1]) // Tour Name
                        .tprice(((Number) obj[2]).intValue()) // Tour Price
                        .build())
                .collect(Collectors.toList());
    }

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

        List<TourDTO> dtoList = result.stream()
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

        return PageResponseDTO.<TourDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();
    }

    // 하나 조회---(유저, 관리자)
    @Override
    public TourDTO get(Long tno) {
        Optional<Tour> result = tourRepository.selectOne(tno);
        Tour tour = result.orElseThrow();
        TourDTO tourDTO = entityChangeDTO(tour, tour.getCategory());

        // 투어 날짜 정보 처리
        List<TourDate> tourDates = tour.getTourDateList();
        tourDTO.setTDate(tourDates.stream()
                .map(TourDate::getTourDate)
                .map(LocalDate::toString)
                .collect(Collectors.toList()));

        List<TourImage> imageList = tour.getTourImageList();
        if (imageList == null || imageList.size() == 0)
            return tourDTO; // 이미지가 없는 상품인 경우

        // 이미지가 있는 상품인 경우
        List<String> fileNameList = imageList.stream()
                .map(tourImage -> tourImage.getFileName())
                .toList();
        tourDTO.setUploadFileNames(fileNameList);

        return tourDTO;
    }

    // //---------------------------------------------------------------

    // 등록 --(관리자)
    @Override
    public Long register(TourDTO tourDTO) {
        String categoryName = tourDTO.getCategoryName();
        String categoryType = "tour";

        Category category = categoryRepository
                .findByCategoryNameAndCategoryType(categoryName, categoryType);

        if (category == null) {
            category = Category.builder()
                    .categoryName(categoryName)
                    .categoryType(categoryType)
                    .build();
            category = categoryRepository.save(category);
        }

        // dtoToEntity로 날짜 처리 로직 이관
        Tour tour = dtoToEntity(tourDTO, category);
        Tour result = tourRepository.save(tour);
        return result.getTno();
    }


    // ----------------------------------------------------------------
    // 수정 --(관리자)
    @Override
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
        }

        // 2.change
        tour.changeCategory(category);

        tour.changeName(tourDTO.getTname());
        tour.changeDesc(tourDTO.getTdesc());
        tour.changePrice(tourDTO.getTprice());
        tour.changeMaxCapacity(tourDTO.getMaxCapacity());
        tour.changeAddress(tourDTO.getTaddress());
        tour.preUpdate();

        // 날짜 정보 업데이트 - dtoToEntity의 날짜 처리 로직 활용
        tour.getTourDateList().clear();
        Tour updatedTour = dtoToEntity(tourDTO, category);
        tour.getTourDateList().addAll(updatedTour.getTourDateList());

        // 이미지 처리
        if (tourDTO.getFiles() != null && !tourDTO.getFiles().isEmpty()) {
            // 기존 이미지 삭제
            List<String> oldFiles = tour.getTourImageList()
                    .stream()
                    .map(TourImage::getFileName)
                    .collect(Collectors.toList());

            fileUtil.deleteFiles(oldFiles);
            tour.imgClearList();

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
        }
    }

    @Override
    public List<TourDTO> getToursByAddress(String taddress) {
        List<Tour> tours = tourRepository.findByTaddress(taddress);
        return tours.stream()
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
//            keywordBuilder.or(qTour.tdesc.containsIgnoreCase(keyword)); // Match description
            booleanBuilder.and(keywordBuilder);
        }

        // Fetch data using combined filters
        Page<Tour> result = tourRepository.findAll(booleanBuilder, pageable);

        // Map to DTOs
        List<TourDTO> dtoList = result.stream()
                // .map(this::entityChangeDTO)
                .map(tour -> entityChangeDTO(tour, tour.getCategory()))
                .collect(Collectors.toList());

        System.out.println(dtoList);

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
            conditionBuilder.or(qTour.tname.containsIgnoreCase(keyword));
        }
        if (type.contains("c")) {
            conditionBuilder.or(qTour.category.categoryName.containsIgnoreCase(keyword));
        }
        if (type.contains("w")) {
            conditionBuilder.or(qTour.taddress.containsIgnoreCase(keyword));
        }

        booleanBuilder.and(conditionBuilder);

        return booleanBuilder;
    }

}
