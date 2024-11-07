package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.domain.QTour;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.domain.TourDate;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.repository.TourDateRepository;
import com.positive.culture.seoulQuest.repository.TourRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@SpringBootTest
@Log4j2
public class SearchRepositoryTests {

    @Autowired
    private TourRepository tourRepository;

    @Transactional
    @Test
    public void testQuery1(){
        Pageable pageable = PageRequest.of(0, 10, Sort.by("tno").descending());
        QTour qTour = QTour.tour;

        String keyword = "E";

        BooleanBuilder builder = new BooleanBuilder();

        BooleanExpression expression = qTour.tname.contains(keyword);

        builder.and(expression);

        Page<Tour> result = tourRepository.findAll(builder, pageable);

        result.stream().forEach(tour -> System.out.println(tour));
    }

}
