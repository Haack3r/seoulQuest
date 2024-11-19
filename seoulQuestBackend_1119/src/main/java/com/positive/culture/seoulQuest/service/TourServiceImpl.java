package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.QTour;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.domain.TourImage;
import com.positive.culture.seoulQuest.dto.*;
import com.positive.culture.seoulQuest.repository.TourDateRepository;
import com.positive.culture.seoulQuest.repository.TourRepository;
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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor //final이 적용된 필드에 대한 생성자 만들어줌
@Transactional
public class TourServiceImpl implements TourService{

    private final TourRepository tourRepository;


    //전체 조회----(유저, 관리자)
    @Override
    public PageResponseDTO<TourDTO> getList(PageRequestDTO pageRequestDTO) {

        // Set up paging and sorting
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("tno").descending()
        );

        // Create search filter using BooleanBuilder
        BooleanBuilder booleanBuilder = getSearch(pageRequestDTO);

        // Execute search query with the filter
        Page<Tour> result = tourRepository.findAll(booleanBuilder, pageable);

        // Convert each Tour entity to a TourDTO
        List<TourDTO> dtoList = result.stream()
                .map(this::entityChangeDTO)
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


    //하나 조회---(유저, 관리자)
    @Override
    public TourDTO get(Long tno) {
        Optional<Tour> result = tourRepository.selectOne(tno);
        Tour tour = result.orElseThrow();
        TourDTO tourDTO = entityChangeDTO(tour);

        List<TourImage> imageList = tour.getTourImageList();
        if(imageList == null|| imageList.size()==0 )return tourDTO; //이미지가 없는 상품인 경우

        //이미지가 있는 상품인 경우
        List<String> fileNameList = imageList.stream().map(tourImage -> tourImage.getFileName()).toList();
        tourDTO.setUploadFileNames(fileNameList);

        return tourDTO;
    }


//    //---------------------------------------------------------------

    //등록 --(관리자)
    @Override
    public Long register(TourDTO tourDTO) {
        Tour tour = dtoToEntity(tourDTO);
        Tour result = tourRepository.save(tour);
        return result.getTno();
    }

    //----------------------------------------------------------------
    //수정 --(관리자)
    @Override
    public void modify(TourDTO tourDTO) {

        //1.read
        Optional<Tour> result = tourRepository.findById(tourDTO.getTno());
        Tour tour = result.orElseThrow();

        //2.change
        tour.changeCategory(tour.getCategory());
        tour.changeName(tourDTO.getTname());
        tour.changeDesc(tourDTO.getTdesc());
        tour.changePrice(tourDTO.getTprice());
        tour.changeMaxCapacity(tourDTO.getMaxCapacity());
        tour.changeLocation(tourDTO.getTlocation());
        tour.preUpdate();

        //3. upload File -- clear first
        tour.clearList(); // clearList()를 이용하여 이미지 리스트를 삭제

        //4. save
        List<String> uploadFileNames = tourDTO.getUploadFileNames();

        if(uploadFileNames !=null && uploadFileNames.size()>0){
            uploadFileNames.stream().forEach(uploadName->{
                tour.addImageString(uploadName);
            });
        }
        tourRepository.save(tour);
    }

    //----------------------------------------------------------
    //삭제 -- (관리자)
    @Override
    public void remove(Long tno) {
        tourRepository.updateToDelete(tno, true);
    }

    @Override
    public List<TourDTO> getToursByLocation(String location) {
        List<Tour> tours = tourRepository.findByTlocationContaining(location);
        return tours.stream().map(this::entityChangeDTO).collect(Collectors.toList());
    }

    @Override
    public List<TourDTO> getToursByAddress(String taddress) {
        List<Tour> tours = tourRepository.findByTaddress(taddress);
        return tours.stream()
                .map(TourDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public PageResponseDTO<TourDTO> getListWithCategory(PageRequestDTO pageRequestDTO, String category) {
        // Get the pageable object with sorting
        Pageable pageable = pageRequestDTO.getPageable(Sort.by("tno").descending());

        // Fetch data based on category
        Page<Tour> result;
        if (category != null && !category.isEmpty()) {
            result = tourRepository.findByCategory_CategoryName(pageable, category);
        } else {
            result = tourRepository.findAll(pageable);
        }

        // Convert Page<Tour> to List<TourDTO>
        List<TourDTO> dtoList = result.stream()
                .map(TourDTO::new)
                .collect(Collectors.toList());

        // Wrap into PageResponseDTO
        return PageResponseDTO.<TourDTO>withAll()
                .dtoList(dtoList)                  // Add the list of DTOs
                .totalCount(result.getTotalElements()) // Total number of elements
                .pageRequestDTO(pageRequestDTO)   // Original PageRequestDTO
                .build();
    }




    private BooleanBuilder getSearch(PageRequestDTO requestDTO){
        String type = requestDTO.getType();
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        QTour qTour = QTour.tour;
        String keyword = requestDTO.getKeyword();

        BooleanExpression expression = qTour.tno.gt(0L);

        //조건만 생성
        booleanBuilder.and(expression);

        if (type == null || type.trim().length() == 0){
            return booleanBuilder;
        }
        //검색 조건 작성하기

        BooleanBuilder conditionBuilder = new BooleanBuilder();
        if (type.contains("t")){
            conditionBuilder.or(qTour.tname.contains(keyword));
        }
        if (type.contains("c")){
            conditionBuilder.or(qTour.tname.contains(keyword));
        }
        if (type.contains("w")){
            conditionBuilder.or(qTour.tname.contains(keyword));
        }

        booleanBuilder.and(conditionBuilder);
        return booleanBuilder;

    }

}