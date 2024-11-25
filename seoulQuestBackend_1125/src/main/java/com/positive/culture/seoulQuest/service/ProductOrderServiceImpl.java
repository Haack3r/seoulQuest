package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ProductOrderServiceImpl implements ProductOrderService {

    private final MemberRepository memberRepository;
    private final ProductOrderRepository productOrderRepository;

    @Override
    public Long saveOrder(OrderDTO orderDTO) {
        String email  = orderDTO.getEmail();
        Member member =memberRepository.findByEmail(email).orElseThrow();

        System.out.println(2 + "OrderDTO를 OrderEntity로 변경하여 저장.");
        //OrderDTO를 OrderEntity로 변경하여 저장.
        ProductOrder productOrder = ProductOrder.builder()
                .orderDate(LocalDateTime.now())
                .pOrderMember(member)
                .recipientFirstName(orderDTO.getFirstname())
                .recipientLastName(orderDTO.getLastname())
                .zipcode(orderDTO.getZipcode().trim())
                .street(orderDTO.getStreet().trim())
                .city(orderDTO.getCity().trim())
                .state(orderDTO.getState().trim())
                .country(orderDTO.getCountry().trim())
                .contactNumber(orderDTO.getPhoneNumber().trim())
                .totalPrice(orderDTO.getTotalPrice())
                .build();
        productOrderRepository.save(productOrder);

        return productOrder.getPOrderId();
    }
}
