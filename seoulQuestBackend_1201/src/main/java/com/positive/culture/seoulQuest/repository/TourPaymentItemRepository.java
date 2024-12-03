package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.ProductPayment;
import com.positive.culture.seoulQuest.domain.ProductPaymentItem;
import com.positive.culture.seoulQuest.domain.TourPayment;
import com.positive.culture.seoulQuest.domain.TourPaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TourPaymentItemRepository extends JpaRepository<TourPaymentItem, Long> {
    //결제된 tour 들의 목록을 찾음
    List<TourPaymentItem> findByTourPaymentIn(List<TourPayment> payments);


    @Query("SELECT DISTINCT t.tour.tno, t.tour.tname, t.tprice, SUM(t.tPaymentQty) AS totalReservations " +
            "FROM TourPaymentItem t " +
            "GROUP BY t.tour.tno, t.tour.tname, t.tprice " +
            "ORDER BY totalReservations DESC")
    List<Object[]> findTopReservedTours();
<<<<<<<< HEAD:seoulQuestBackend_1202/src/main/java/com/positive/culture/seoulQuest/repository/TourPaymentItemRepository.java
    List<TourPaymentItem> findByTourPayment(TourPayment tourPayment);
========
    List<TourPaymentItem> findBytourPayment(TourPayment tourPayment);
>>>>>>>> c85e02191e4587f3b5c1c2b3f08dfcf00fb02866:seoulQuestBackend_1201/src/main/java/com/positive/culture/seoulQuest/repository/TourPaymentItemRepository.java

}
