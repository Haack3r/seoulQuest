package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.dto.TourDTO;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Transactional
public interface TourService {

    //전체 조회
    PageResponseDTO<TourDTO> getList(PageRequestDTO pageRequestDTO);

    //하나 조회
    TourDTO get(Long tno);

    //등록
    Long register(TourDTO tourDTO);

    //수정
    void modify(TourDTO tourDTO);

    //삭제
    void remove(Long tno);
    List<Tour> getTourBytDateA(LocalDate date);

    default  //DTO를 엔티티로 변환해주는 메서드 -> register에 사용
    public Tour dtoToEntity(TourDTO tourDTO){
        Tour tour =Tour.builder()
                .tno(tourDTO.getTno())
                .tname(tourDTO.getTname())
                .tdesc(tourDTO.getTdesc())
                .tprice(tourDTO.getTprice())
                .tcategoryName(tourDTO.getTcategoryName())
                .tlocation(tourDTO.getTlocation())
                .zipcode(tourDTO.getZipcode())
                .seatRemain(tourDTO.getSeatRemain())
                .tDate(tourDTO.getTDate())
                .createAt(tourDTO.getCreateAt())
                .updateAt(tourDTO.getUpdateAt())
                .build();

        //업로드 처리가 끝난 파일들의 이름 리스트
        List<String> uploadFileNames = tourDTO.getUploadFileNames();

        if(uploadFileNames== null){
            return tour;
        }

        uploadFileNames.stream().forEach(uploadNames ->{
            tour.addImageString(uploadNames);
        });

        return tour;
    }

    default   //엔티티를 DTO로 변환해주는 메서드  -> getList와 get에 사용
    public TourDTO entityChangeDTO(Tour tour){
        TourDTO tourDTO = TourDTO.builder()
                .tno(tour.getTno())
                .tname(tour.getTname())
                .tdesc(tour.getTdesc())
                .tprice(tour.getTprice())
                .tcategoryName(tour.getTcategoryName())
                .tlocation(tour.getTlocation())
                .zipcode(tour.getZipcode())
                .seatRemain(tour.getSeatRemain())
                .tDate(tour.getTDate())
                .createAt(tour.getCreateAt())
                .updateAt(tour.getUpdateAt())
                .build();
        return tourDTO;
    }

}
