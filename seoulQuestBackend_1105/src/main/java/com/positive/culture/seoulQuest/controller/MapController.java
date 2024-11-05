package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.TourDTO;
import com.positive.culture.seoulQuest.service.TourService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/map/items")
@PreAuthorize("hasAnyRole('ROLE_USER')")
public class MapController {

    private final TourService tourService;

    @GetMapping("/list/{category}")
    public PageResponseDTO<TourDTO> list(@PathVariable String category) {
        log.info("list.......... category:"+category);
        //return tourService.getListByCategory(category, pageRequestDTO);
        return null;
    }
//    @GetMapping("/area/{area}")
//    public ResponseEntity<List<TourDTO>> getToursByArea(@PathVariable("area") String area) {
//        System.out.println(area);
//        List<Tour> tours = tourService.findAllByArea(area);
//        List<TourDTO> dtoList =new ArrayList<>();
//        tours.forEach(i-> {
//            dtoList.add(tourService.entityChangeDTO(i));
//        });
//        return new ResponseEntity<>(dtoList, HttpStatus.OK);
//    }
}
