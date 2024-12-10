package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProductOrderRepository extends JpaRepository<ProductOrder,Long>, QuerydslPredicateExecutor<ProductOrder> {



}
