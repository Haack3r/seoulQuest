package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.dto.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
public interface TourService {

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
                .tname(tourDTO.getTname())
                .tdesc(tourDTO.getTdesc())
                .tprice(tourDTO.getTprice())
                .maxCapacity(tourDTO.getMaxCapacity())
                .tlocation(tourDTO.getTlocation())
                .createAt(tourDTO.getCreateAt())
                .updateAt(tourDTO.getUpdateAt())
                .likeCount(tourDTO.getLikeCount())
                .tDate(tourDTO.getTDate())
                .build();

        // 업로드 처리가 끝난 파일들의 이름 리스트
        List<String> uploadFileNames = tourDTO.getUploadFileNames();

        if (uploadFileNames == null) {
            return tour;
        }

        uploadFileNames.stream().forEach(uploadNames -> {
            tour.addImageString(uploadNames);
        });

        return tour;
    }

    default // 엔티티를 DTO로 변환해주는 메서드 -> getList와 get에 사용
    public TourDTO entityChangeDTO(Tour tour) {
        TourDTO tourDTO = TourDTO.builder()
                .tno(tour.getTno())
                .tname(tour.getTname())
                .categoryName(tour.getCategory().getCategoryName())
                .tdesc(tour.getTdesc())
                .tprice(tour.getTprice())
                .maxCapacity(tour.getMaxCapacity())
                .tlocation(tour.getTlocation())
                .likeCount(tour.getLikeCount())
                .tDate(tour.getTDate())
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

    // 서울 관광지 조회
    List<TourDTO> getToursByLocation(String location);

    //
    List<TourDTO> getToursByAddress(String taddress);

    public PageResponseDTO<TourDTO> getListWithCategory(PageRequestDTO pageRequestDTO, String category);

}