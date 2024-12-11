package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.dto.OrderDTO;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ProductOrderService {
    // 주문 상품 저장
    public Long saveOrder(OrderDTO orderDTO);

}
