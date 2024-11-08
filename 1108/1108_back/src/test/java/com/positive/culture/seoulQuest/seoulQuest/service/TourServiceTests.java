package com.positive.culture.seoulQuest.seoulQuest.service;


import com.positive.culture.seoulQuest.domain.TourDate;
import com.positive.culture.seoulQuest.repository.TourDateRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Log4j2
public class TourServiceTests {

    @Autowired
    TourDateRepository tourDateRepository;

    @Test
    public void TestGetTourDateList(){
        List<TourDate> list = tourDateRepository.selectDateList(1l);
        list.forEach(i-> System.out.println(i));
    }


}
