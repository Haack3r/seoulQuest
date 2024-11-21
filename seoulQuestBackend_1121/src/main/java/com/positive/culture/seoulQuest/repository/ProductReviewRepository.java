package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.ProductReview;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductReviewRepository extends JpaRepository<ProductReview,Long> {

    @Query("SELECT pr.productPaymentItem.pPaymentItemId FROM ProductReview pr WHERE pr.member.email = :email")
    List<Long> findReviewedPaymentItemIdsByEmail(String email);

    List<ProductReview> findByProductPno(Long pno);

}
