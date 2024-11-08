package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {

}
