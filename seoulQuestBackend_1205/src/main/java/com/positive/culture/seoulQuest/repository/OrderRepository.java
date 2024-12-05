package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long>, QuerydslPredicateExecutor<Order> {

    // 소프트 삭제를 위한 쿼리
    @Modifying
    @Query("update Order o set o.delFlag = :flag where o.orderId = :orderId")
    void updateDelFlag(@Param("orderId") Long orderId, @Param("flag") boolean flag);

    // 주문 상태별 조회
    @Query("select o from Order o where o.status = :status and o.delFlag = false")
    Page<Order> findByStatus(@Param("status") String status, Pageable pageable);

    // 특정 기간 내 주문 조회
    @Query("select o from Order o where o.orderDate between :startDate and :endDate and o.delFlag = false")
    Page<Order> findByDateRange(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable);
}