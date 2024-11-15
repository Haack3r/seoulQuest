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

//    //2. 투어 카테고리 데이터 저장
//    @Test
//    public void testTourCategoryDummy() {
//        String[] tourCategories = {
//                "Palaces & Historical Sites", "Traditional Villages", "Cultural Streets", "Shopping Districts",
//                "Towers & Panoramic Views", "Modern Architecture", "Luxury Experiences", "Multicultural Areas",
//                "Street Markets", "Rivers & Streams", "Art & Creativity", "Museums & Galleries",
//                "Parks & Nature Trails", "Mountains & Hiking", "Temples & Spiritual Sites",
//                "Olympic Sites", "Antique & Vintage Markets", "University Districts", "Presidential & Government Sites",
//                "Seasonal Festivals"
//        };
//
//        IntStream.rangeClosed(0, tourCategories.length - 1).forEach(i -> {
//            Category category = Category.builder()
//                    .categoryName(tourCategories[i])
//                    .categoryType("tour")
//                    .build();
//            categoryRepository.save(category);
//        });
//    }

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
