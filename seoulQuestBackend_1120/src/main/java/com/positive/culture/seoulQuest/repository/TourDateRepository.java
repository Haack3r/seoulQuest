package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.TourDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TourDateRepository extends JpaRepository<TourDate,Long> {

    //url로 들어오는 tno를 받아, tno에 해당하는  TourDateList 를 TourDate 테이블에서 가져옴
    @Query("select td from TourDate td where td.tour.tno = :tno")
    List<TourDate> selectDateList(@Param("tno")Long tno);

    Optional<TourDate> findByTourDateAndTourTno(LocalDate tourDate, Long tno);

}

