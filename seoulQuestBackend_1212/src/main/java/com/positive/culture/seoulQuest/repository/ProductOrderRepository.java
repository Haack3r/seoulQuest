package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductOrderRepository
        extends JpaRepository<ProductOrder, Long>, QuerydslPredicateExecutor<ProductOrder> {
    // 결제 완료된 주문 조회
    // booleanBuilder 사용으로 이 코드 안 씀

    // @Query("select po from ProductOrder po " +
    // "where po.paymentStatus = 'paid' " +
    // "and (:keyword is null or po.pOrderId like concat('%',:keyword,'%'))")
    // List<ProductOrder> getPaidOrders(@Param("keyword") String keyword);

}
