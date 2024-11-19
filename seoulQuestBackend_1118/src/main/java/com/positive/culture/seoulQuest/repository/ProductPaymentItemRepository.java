package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.ProductPayment;
import com.positive.culture.seoulQuest.domain.ProductPaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductPaymentItemRepository extends JpaRepository<ProductPaymentItem, Long> {

    //payment리스트로 구매한 상품 이름 모두 다 찾을때 사용
    @Query("SELECT pi.pname FROM ProductPaymentItem pi WHERE pi.productPayment IN :payments")
    List<String> findAllPnamesByPayments(List<ProductPayment> payments);

}
