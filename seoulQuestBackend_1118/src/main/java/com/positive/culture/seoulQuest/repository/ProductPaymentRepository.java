package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.ProductPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductPaymentRepository extends JpaRepository<ProductPayment, Long> {
    //멤버로 해당하는 모든 payment List 찾기
    @Query("SELECT p FROM ProductPayment p WHERE p.pPaymentMember = :member")
    List<ProductPayment> findByMember(Member member);


}
