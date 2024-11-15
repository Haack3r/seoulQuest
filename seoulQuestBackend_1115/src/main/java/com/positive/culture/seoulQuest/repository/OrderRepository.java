package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Order;
import com.positive.culture.seoulQuest.domain.UserCoupon;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {



}
