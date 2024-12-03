package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.ProductPayment;
<<<<<<<< HEAD:seoulQuestBackend_1202/src/main/java/com/positive/culture/seoulQuest/repository/TourPaymentRepository.java
import com.positive.culture.seoulQuest.domain.TourOrder;
========
>>>>>>>> c85e02191e4587f3b5c1c2b3f08dfcf00fb02866:seoulQuestBackend_1201/src/main/java/com/positive/culture/seoulQuest/repository/TourPaymentRepository.java
import com.positive.culture.seoulQuest.domain.TourPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TourPaymentRepository extends JpaRepository<TourPayment, Long> {
    @Query("SELECT t FROM TourPayment t WHERE t.tPaymentMember.email = :email")
    List<TourPayment> findByMemberEmail(String email);

    List<TourPayment> findBytPaymentMember(Member member);
<<<<<<<< HEAD:seoulQuestBackend_1202/src/main/java/com/positive/culture/seoulQuest/repository/TourPaymentRepository.java
    TourPayment findByTourOrder(TourOrder tourOrder);
========
>>>>>>>> c85e02191e4587f3b5c1c2b3f08dfcf00fb02866:seoulQuestBackend_1201/src/main/java/com/positive/culture/seoulQuest/repository/TourPaymentRepository.java
}
