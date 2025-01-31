package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class CategoryRepositoryTests { // 투어와 상품의 카테고리 데이터 저장용
    @Autowired
    CategoryRepository categoryRepository;


    //1.상품 카테고리 데이터 저장
    @Test
    public void testProductCategoryDummy(){
        String[] productCategories = {
                "K-Beauty", "Exotic Tea", "Fashion", "Gourmet"
        };
        IntStream.rangeClosed(0,productCategories.length-1).forEach(i->{
            Category category = Category.builder()
                    .categoryName(productCategories[i])
                    .categoryType("product")
                    .build();
            categoryRepository.save(category);
        });
    }

    //2. 투어 카테고리 저장
    @Test
    public void testTourCategoryDummy() {
        String[] tourCategories = {
                "Historical & Cultural Sites", "Shopping & Lifestyle", "Landmarks & Scenic Views", "Nature & Outdoor", "Art & Creativity"
        };

        IntStream.rangeClosed(0, tourCategories.length - 1).forEach(i -> {
            Category category = Category.builder()
                    .categoryName(tourCategories[i])
                    .categoryType("tour")
                    .build();
            categoryRepository.save(category);
        });
    }

}
