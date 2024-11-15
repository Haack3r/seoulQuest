package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.PaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentRecord, Long> {
}
