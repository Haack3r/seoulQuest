package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long>, QuerydslPredicateExecutor<Category> {

        // 전체 조회 ( JPA 에서는 findAll() 을 사용하면 되서 추천하지 않음)
        @Query("select c from Category c")
        List<Category> findAllCategories();

        // 카테고리 이름과 타입으로 조회
        @Query("select c from Category c where c.categoryName = :categoryName" +
                        " and c.categoryType = :categoryType")
        Optional<Category> findAllCategoriesList(@Param("categoryName") String categoryName,
                        @Param("categoryType") String categoryType);

        // 전체 페이징으로 조회
        @Query("select c from Category c")
        Page<Category> findAllCategoriesWithPages(Pageable pageable);

        // 카테고리 네임으로 조회
        @Query("select c from Category c where c.categoryName = :categoryName")
        Page<Category> findAllByCategoryName(Pageable pageable, String categoryName);

        // 카테고리 타입으로 조회
        @Query("select c from Category c where c.categoryType = :categoryType")
        Page<Category> findAllByCategoryType(Pageable pageable, String categoryType);

        Category findByCategoryNameAndCategoryType(String categoryName, String categoryType);
}
