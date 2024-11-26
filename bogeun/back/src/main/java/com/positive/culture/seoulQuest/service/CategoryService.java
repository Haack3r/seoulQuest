package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.dto.CategoryDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface CategoryService {

    default Category dtoToEntity(CategoryDTO categoryDTO) {
        Category category = Category.builder()
                .categoryId(categoryDTO.getCategoryId())
                .categoryName(categoryDTO.getCategoryName())
                .categoryType(categoryDTO.getCategoryType())
                .build();
        return category;
    }

    default CategoryDTO entityToDto(Category category) {
        CategoryDTO categoryDTO = CategoryDTO.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .categoryType(category.getCategoryType())
                .build();

        return categoryDTO;
    }
}
