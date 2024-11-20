package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductReviewRepository extends JpaRepository<ProductReview,Long> {
}
