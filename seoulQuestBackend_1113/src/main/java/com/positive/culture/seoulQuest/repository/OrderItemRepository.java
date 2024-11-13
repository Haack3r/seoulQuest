package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Order;
import com.positive.culture.seoulQuest.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

}
