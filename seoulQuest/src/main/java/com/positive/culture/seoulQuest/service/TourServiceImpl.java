package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.domain.TourImage;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.dto.TourDTO;
import com.positive.culture.seoulQuest.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

        Pageable pageable =  PageRequest.of(
                pageRequestDTO.getPage()-1,
                pageRequestDTO.getSize(),
                Sort.by("tno").descending());

        //<Object[]>에는 product, productImage 객체가 담겨있음
        Page<Object[]> result = tourRepository.selectList(pageable);

        List<TourDTO> dtoList = result.get().map(arr->{
            Tour tour = (Tour) arr[0];
            TourImage tourImage = (TourImage) arr[1];

            //Entity를 DTO로 변환
            TourDTO tourDTO = entityChangeDTO(tour);

            String imageStr = tourImage.getFileName();
            tourDTO.setUploadFileNames(List.of(imageStr)); //List.of 불변하는 리스트를 생성
            return tourDTO;
        }).collect(Collectors.toList()); //end of map , map으로 productDTO의 리스트를 만듦

        long totalCount= result.getTotalElements();

        return PageResponseDTO.<TourDTO>withAll()
                .dtoList(dtoList) //ProductDTO 객체가 담겨있는 list
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

    //엔티티를 DTO로 변환해주는 메서드  -> getList와 get에 사용
//    public TourDTO entityChangeDTO(Tour tour){
//        TourDTO tourDTO = TourDTO.builder()
//                .tno(tour.getTno())
//                .tname(tour.getTname())
//                .tdesc(tour.getTdesc())
//                .tprice(tour.getTprice())
//                .tcategoryName(tour.getTcategoryName())
//                .tlocation(tour.getTlocation())
//                .zipcode(tour.getZipcode())
//                .seatRemain(tour.getSeatRemain())
//                .tDate(tour.getTDate())
//                .createAt(tour.getCreateAt())
//                .updateAt(tour.getUpdateAt())
//                .build();
//        return tourDTO;
//    }
//
//    //---------------------------------------------------------------

    //등록 --(관리자)
    @Override
    public Long register(TourDTO tourDTO) {
        Tour tour = dtoToEntity(tourDTO);
        Tour result = tourRepository.save(tour);
        return result.getTno();
    }

    //DTO를 엔티티로 변환해주는 메서드 -> register에 사용
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

    //----------------------------------------------------------------
    //수정 --(관리자)
    @Override
    public void modify(TourDTO tourDTO) {

        //1.read
        Optional<Tour> result = tourRepository.findById(tourDTO.getTno());
        Tour tour = result.orElseThrow();

        //2.change pname, pdesc, price,quantity, catergoryName, updateAt
        tour.changeName(tourDTO.getTname());
        tour.changeDesc(tourDTO.getTdesc());
        tour.changePrice(tourDTO.getTprice());
        tour.changeSeatRemain(tourDTO.getSeatRemain());
        tour.changeTDate(tourDTO.getTDate());
        tour.changeLocation(tourDTO.getTlocation());
        tour.changeZipcode(tourDTO.getZipcode());
        tour.changeCategoryName(tour.getTcategoryName());
        tour.changeUpdateAt(tourDTO.getUpdateAt());

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

//    @Override
//    public Tour getTourBytDateA(LocalDate date, Long tno) {
//        Tour tour = tourRepository.getTourBytDate(date,tno);
//        return tour;
//    }

}
