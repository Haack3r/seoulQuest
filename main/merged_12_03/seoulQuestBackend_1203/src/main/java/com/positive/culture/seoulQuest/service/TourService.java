package com.positive.culture.seoulQuest.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.domain.TourDate;
import com.positive.culture.seoulQuest.dto.*;
import com.positive.culture.seoulQuest.formatter.LocalDateFormatter;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Transactional
public interface TourService {

    // 신청 가능한 실제 인원 조회
    int getAvailable(Long tno, String selectedDate);

    // 전체 조회
    PageResponseDTO<TourDTO> getList(PageRequestDTO pageRequestDTO);

    // 전체 조회 ( 관리자 용 )
    PageResponseDTO<TourDTO> getAdminTourList(PageRequestDTO pageRequestDTO);

    // 하나 조회
    TourDTO get(Long tno);

    // 등록
    Long register(TourDTO tourDTO);

    // 수정
    void modify(TourDTO tourDTO);

    // 삭제
    void remove(Long tno);

    // 이미지 삭제
    void removeTourImage(Long tno, String fileName);

    // 등록시 카테고리 부분 추가 수정 필요함
    // DTO를 엔티티로 변환해주는 메서드 -> register에 사용
    default public Tour dtoToEntity(TourDTO tourDTO, Category category) {
        Tour tour = Tour.builder()
                .tno(tourDTO.getTno())
                .category(category)
                .tname(tourDTO.getTname())
                .tdesc(tourDTO.getTdesc())
                .tprice(tourDTO.getTprice())
                .maxCapacity(tourDTO.getMaxCapacity())
                .taddress(tourDTO.getTaddress())
                .createAt(tourDTO.getCreateAt())
                .updateAt(tourDTO.getUpdateAt())
                .delFlag(tourDTO.isDelFlag())
                .build();

        // 날짜 처리
        if (tourDTO.getTourDate() != null && !tourDTO.getTourDate().isEmpty()) {
            tourDTO.getTourDate().forEach(dateStr -> {
                try {
                    tour.addTourDate(TourDate.builder()
                            .tourDate(LocalDate.parse(dateStr))
                            .availableCapacity(tourDTO.getMaxCapacity())
                            .build());
                } catch (Exception e) {
                    throw new RuntimeException("날짜 변환 오류: " + dateStr, e);
                }
            });
        }

        // 이미지 처리
        if (tourDTO.getUploadFileNames() != null) {
            tourDTO.getUploadFileNames().forEach(tour::addImageString);
        }

        return tour;
    }

    // 엔티티를 DTO로 변환해주는 메서드 -> getList와 get에 사용
    default public TourDTO entityChangeDTO(Tour tour, Category category) {
        TourDTO tourDTO = TourDTO.builder()
                .tno(tour.getTno())
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .categoryType(category.getCategoryType())
                .tname(tour.getTname())
                .tdesc(tour.getTdesc())
                .tprice(tour.getTprice())
                .maxCapacity(tour.getMaxCapacity())
                .taddress(tour.getTaddress())
                .tourDate(tour.getTourDateList()
                        .stream()
                        .map(tourDate -> tourDate.getTourDate().toString())
                        .collect(Collectors.toList()))
                .tourDates(tour.getTourDateList()
                        .stream()
                        .map(tourDate -> TourDateDTO.builder()
                                .tourDate(tourDate.getTourDate().toString())
                                .availableCapacity(tourDate.getAvailableCapacity())
                                .build())
                        .collect(Collectors.toList()))
                .createAt(tour.getCreateAt())
                .updateAt(tour.getUpdateAt())
                .build();

        // 이미지 정보 처리 - null 체크 추가 필요
        if (tour.getUploadFileNames() != null && !tour.getUploadFileNames().isEmpty()) {
            tourDTO.setUploadFileNames(tour.getUploadFileNames());
        } else {
            tourDTO.setUploadFileNames(new ArrayList<>()); // 빈 배열로 초기화
        }

        return tourDTO;
    }

    //
    List<TourDTO> getToursByAddress(String taddress);

    public PageResponseDTO<TourDTO> getListWithCategory(PageRequestDTO pageRequestDTO, String category);

    List<TourDTO> getTopReservedTours(int limit);

    // 투어 날짜 정보 조회
    List<TourDateDTO> getTourDates(Long tno);

}