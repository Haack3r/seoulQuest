package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.TourPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TourPaymentRepository extends JpaRepository<TourPayment, Long> {
    @Query("SELECT t FROM TourPayment t WHERE t.tPaymentMember.email = :email")
    List<TourPayment> findByMemberEmail(String email);
}