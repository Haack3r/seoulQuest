package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.repository.ProductRepository;
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

    @Autowired
    private ProductRepository productRepository;

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

    @Transactional
    @Test
    public void testQuery2(){
        Pageable pageable = PageRequest.of(0, 10, Sort.by("pno").descending());
        QProduct qProduct = QProduct.product;

        String keyword = "E";

        BooleanBuilder builder = new BooleanBuilder();

        BooleanExpression expression = qProduct.pname.contains(keyword);

        builder.and(expression);

        Page<Product> result = productRepository.findAll(builder, pageable);

        result.stream().forEach(product -> System.out.println(product));
    }

}
