package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.PaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentItemRepository extends JpaRepository<PaymentItem, Long> {
}
