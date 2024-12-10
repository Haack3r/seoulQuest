package com.positive.culture.seoulQuest.service;


import com.positive.culture.seoulQuest.domain.ProductOrder;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Transactional
public interface ProductOrderService {
    //주문 상품 저장
    public Long saveOrder(OrderDTO orderDTO);
}
