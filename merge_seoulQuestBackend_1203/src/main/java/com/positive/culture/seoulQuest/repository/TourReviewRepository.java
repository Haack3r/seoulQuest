package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.TourReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TourReviewRepository extends JpaRepository<TourReview,Long> {
    //ReadPage에서 review찾을때 사용
    List<TourReview> findByTourTno(Long tno);

    @Query("SELECT tr.tourPaymentItem.tPaymentItemId FROM TourReview tr WHERE tr.member.email = :email")
    List<Long> findReviewedPaymentItemIdsByEmail(String email);

    Page<TourReview> findByMemberEmail(String email, Pageable pageable);
}