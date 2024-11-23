package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.ProductPayment;
import com.positive.culture.seoulQuest.domain.ProductPaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductPaymentItemRepository extends JpaRepository<ProductPaymentItem, Long> {
    //리뷰가 작성되지 않은 결제 아이템을 찾을때 사용
    List<ProductPaymentItem> findByProductPaymentIn(List<ProductPayment> payments);
}
