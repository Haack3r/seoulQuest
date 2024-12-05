package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Order;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface OrderService {
    // 주문 목록 조회 (관리자용)
    PageResponseDTO<OrderDTO> getAdminOrderList(PageRequestDTO pageRequestDTO);

    // 주문 상세 조회
    OrderDTO get(Long orderId);

    // 주문 상태 변경
    void updateStatus(Long orderId, String status);

    // 주문 삭제 (소프트 삭제)
    void remove(Long orderId);

    // DTO를 엔티티로 변환
    default Order dtoToEntity(OrderDTO orderDTO) {
        return Order.builder()
                .orderId(orderDTO.getOrderId())
                .orderNumber(orderDTO.getOrderNumber())
                .customerName(orderDTO.getCustomerName())
                .status(orderDTO.getStatus())
                .totalAmount(orderDTO.getTotalAmount())
                .deliveryInfo(orderDTO.getDeliveryInfo())
                .trackingNumber(orderDTO.getTrackingNumber())
                .shippingStatus(orderDTO.getShippingStatus())
                .orderDate(orderDTO.getOrderDate())
                .contact(orderDTO.getContact())
                .build();
    }

    // 엔티티를 DTO로 변환
    default OrderDTO entityToDto(Order order) {
        return OrderDTO.builder()
                .orderId(order.getOrderId())
                .orderNumber(order.getOrderNumber())
                .customerName(order.getCustomerName())
                .status(order.getStatus())
                .totalAmount(order.getTotalAmount())
                .deliveryInfo(order.getDeliveryInfo())
                .trackingNumber(order.getTrackingNumber())
                .shippingStatus(order.getShippingStatus())
                .orderDate(order.getOrderDate())
                .contact(order.getContact())
                .build();
    }
}
