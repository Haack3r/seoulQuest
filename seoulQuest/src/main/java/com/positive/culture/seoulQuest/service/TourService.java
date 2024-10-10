package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.dto.TourDTO;
import org.springframework.transaction.annotation.Transactional;

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
}
