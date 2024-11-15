package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import com.positive.culture.seoulQuest.repository.TourRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.stream.IntStream;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

@SpringBootTest
@Log4j2
public class CategoryRepositoryTests { // 투어와 상품의 카테고리 데이터 저장용
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    TourRepository tourRepository;


    //1.상품 카테고리 데이터 저장
    @Test
    public void testProductCategoryDummy(){
        String[] productCategories = {
                "Electronics", "Fashion", "Home Appliances", "Beauty and Personal Care",
                "Sports Equipment", "Outdoor Gear", "Toys and Games",
                "Books", "Furniture", "Groceries", "Health Supplements",
                "Pet Supplies", "Stationery", "Automotive", "Garden Tools"
        };
        IntStream.rangeClosed(0,productCategories.length-1).forEach(i->{
            Category category = Category.builder()
                    .categoryName(productCategories[i])
                    .categoryType("product")
                    .build();
            categoryRepository.save(category);
        });
    }

    //2. 투어 카테고리 데이터 저장
    @Test
    public void testTourCategoryDummy() {
        String[] tourCategories = {
                "Palaces & Historical Sites", "Traditional Villages", "Cultural Streets", "Shopping Districts",
                "Towers & Panoramic Views", "Modern Architecture", "Luxury Experiences", "Multicultural Areas",
                "Street Markets", "Rivers & Streams", "Art & Creativity", "Museums & Galleries",
                "Parks & Nature Trails", "Mountains & Hiking", "Temples & Spiritual Sites",
                "Olympic Sites", "Antique & Vintage Markets", "University Districts", "Presidential & Government Sites",
                "Seasonal Festivals"
        };

        IntStream.rangeClosed(0, tourCategories.length - 1).forEach(i -> {
            Category category = Category.builder()
                    .categoryName(tourCategories[i])
                    .categoryType("tour")
                    .build();
            categoryRepository.save(category);
        });
    }

    @Test
    public void testFindAllByCategoryType() {
        // 1. 테스트용 Category 데이터 생성 및 저장
        Category category1 = Category.builder()
                .categoryName("111")
                .categoryType("product")
                .build();
        categoryRepository.save(category1);

        Category category2 = Category.builder()
                .categoryName("222")
                .categoryType("product")
                .build();
        categoryRepository.save(category2);

        // 2. Pageable 객체 생성
        // PageRequest.of(페이지번호, 페이지크기, 정렬방식)
        Pageable pageable = PageRequest.of(0, 10, Sort.by("categoryId").descending());

        // 3. 페이징 조회 실행
        Page<Category> result = categoryRepository.findAllByCategoryType(pageable,"product");

        // 4. 결과 검증
        log.info("Total Pages: " + result.getTotalPages());  // 전체 페이지 수
        log.info("Total Elements: " + result.getTotalElements());  // 전체 요소 수
        log.info("Current Page Number: " + result.getNumber());  // 현재 페이지 번호
        log.info("Current Page Size: " + result.getSize());  // 페이지 크기
        log.info("Has Next Page: " + result.hasNext());  // 다음 페이지 존재 여부

        // 5. 현재 페이지의 데이터 확인
        result.getContent().forEach(category -> {
            log.info("Category: " + category);
        });

        // 6. 검증
//        assertThat(result.getContent()).hasSize(2);  // 데이터 개수 확인
//        assertThat(result.getContent().get(0).getCategoryType()).isEqualTo("product");  // 타입 확인

        // 6. 검증 - 전체 데이터 수 대신 최근 추가된 두 데이터 확인
        assertThat(result.getContent().get(0).getCategoryName()).isEqualTo("222");
        assertThat(result.getContent().get(1).getCategoryName()).isEqualTo("111");
        // 또는 전체 개수로 검증
        assertThat(result.getTotalElements()).isGreaterThanOrEqualTo(2L);
    }

}
