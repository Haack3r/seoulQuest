package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Order;
import com.positive.culture.seoulQuest.domain.QOrder;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.repository.OrderRepository;
import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    public PageResponseDTO<OrderDTO> getAdminOrderList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("orderDate").descending());

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        QOrder qOrder = QOrder.order;

        // 키워드 검색 조건 추가
        if (pageRequestDTO.getKeyword() != null && !pageRequestDTO.getKeyword().trim().isEmpty()) {
            booleanBuilder.and(qOrder.customerName.contains(pageRequestDTO.getKeyword())
                    .or(qOrder.orderNumber.contains(pageRequestDTO.getKeyword())));
        }

        // 상태 필터링 조건 추가
        if (pageRequestDTO.getType() != null && !pageRequestDTO.getType().trim().isEmpty()) {
            booleanBuilder.and(qOrder.status.eq(pageRequestDTO.getType()));
        }

        Page<Order> result = orderRepository.findAll(booleanBuilder, pageable);

        List<OrderDTO> dtoList = result.getContent().stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());

        return PageResponseDTO.<OrderDTO>withAll()
                .dtoList(dtoList)
                .totalCount(result.getTotalElements())
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    @Override
    public OrderDTO get(Long orderId) {
        Optional<Order> result = orderRepository.findById(orderId);
        Order order = result.orElseThrow();
        return entityToDto(order);
    }

    @Override
    public void updateStatus(Long orderId, String status) {
        Optional<Order> result = orderRepository.findById(orderId);
        Order order = result.orElseThrow();
        order.changeStatus(status);
        orderRepository.save(order);
    }

    @Override
    public void remove(Long orderId) {
        orderRepository.updateDelFlag(orderId, true);
    }
}
