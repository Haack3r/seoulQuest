package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TourOrderServiceImpl implements TourOrderService {

    private final MemberRepository memberRepository;
    private final TourOrderRepository orderRepository;

    @Override
    public Long saveOrder(OrderDTO orderDTO) {
        String email  = orderDTO.getEmail();
        Member member =memberRepository.findByEmail(email).orElseThrow();

        //OrderDTO를 OrderEntity로 변경하여 저장.
        TourOrder tourOrder = TourOrder.builder()
                .orderDate(LocalDateTime.now())
                .tOrderMember(member)
                .firstName(orderDTO.getFirstname())
                .lastName(orderDTO.getLastname())
                .country(orderDTO.getCountry().trim())
                .phoneNumber(orderDTO.getPhoneNumber().trim())
                .totalPrice(orderDTO.getTotalPrice())
                .build();
        orderRepository.save(tourOrder);

        return tourOrder.getTOrderId();
    }
}
