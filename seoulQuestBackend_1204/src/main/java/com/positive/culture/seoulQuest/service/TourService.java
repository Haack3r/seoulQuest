package com.positive.culture.seoulQuest.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.domain.TourDate;
import com.positive.culture.seoulQuest.dto.*;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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
    default // DTO를 엔티티로 변환해주는 메서드 -> register에 사용
    public Tour dtoToEntity(TourDTO tourDTO, Category category) {
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
                // .tDate(tourDTO.getTDate())
                .build();

        // 업로드 처리가 끝난 파일들의 이름 리스트
        // List<String> uploadFileNames = tourDTO.getUploadFileNames();
        List<String> tourDateList = tourDTO.getTdate();

        if (tourDateList != null && !tourDateList.isEmpty()) {
            tourDTO.getTdate().forEach(dateStr -> {
                try {
                    tour.addTourDate(TourDate.builder()
                            .tdate(LocalDate.parse(dateStr))
                            .availableCapacity(tourDTO.getMaxCapacity())
                            .build());
                } catch (Exception e) {
                    throw new RuntimeException("날짜 변환 오류: " + dateStr, e);
                }
            });
        }

        List<String> uploadFileNames = tourDTO.getUploadFileNames();

        // 이미지 처리
        if (uploadFileNames == null) {
            return tour;
        }
        uploadFileNames.stream().forEach(uploadNames -> {
            tour.addImageString(uploadNames);
        });

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
                .tdate(tour.getTourDateList()
                        .stream()
                        .map(tourDate -> {
                            try {
                                ObjectMapper mapper = new ObjectMapper();
                                TourDateDTO dateDTO = TourDateDTO.builder()
                                        .tdate(tourDate.getTdate().toString())
                                        .availableCapacity(tourDate.getAvailableCapacity())
                                        .build();
                                return mapper.writeValueAsString(dateDTO);
                            } catch (Exception e) {
                                throw new RuntimeException("날짜 데이터 변환 중 오류 발생", e);
                            }
                        })
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

}