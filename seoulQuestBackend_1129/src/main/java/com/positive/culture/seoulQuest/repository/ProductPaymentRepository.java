package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.ProductPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductPaymentRepository extends JpaRepository<ProductPayment, Long> {
    @Query("SELECT p FROM ProductPayment p WHERE p.pPaymentMember.email = :email")
    List<ProductPayment> findByMemberEmail(String email);

    List<ProductPayment> findBypPaymentMember(Member member);
}
