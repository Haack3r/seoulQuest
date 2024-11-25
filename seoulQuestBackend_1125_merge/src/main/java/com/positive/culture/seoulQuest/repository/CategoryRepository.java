package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByCategoryName(String categoryName);
    List<Category> findByCategoryType(String categoryType);

}
