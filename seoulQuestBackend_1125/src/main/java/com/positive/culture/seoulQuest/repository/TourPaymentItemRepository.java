package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.TourPayment;
import com.positive.culture.seoulQuest.domain.TourPaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourPaymentItemRepository extends JpaRepository<TourPaymentItem, Long> {
    //결제된 tour 들의 목록을 찾음
    List<TourPaymentItem> findByTourPaymentIn(List<TourPayment> payments);

}
