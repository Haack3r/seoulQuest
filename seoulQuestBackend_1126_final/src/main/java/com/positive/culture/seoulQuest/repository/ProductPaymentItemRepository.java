package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.ProductPayment;
import com.positive.culture.seoulQuest.domain.ProductPaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductPaymentItemRepository extends JpaRepository<ProductPaymentItem, Long> {
    //결제된 product 들의 목록을 찾음
    List<ProductPaymentItem> findByProductPaymentIn(List<ProductPayment> payments);
}
