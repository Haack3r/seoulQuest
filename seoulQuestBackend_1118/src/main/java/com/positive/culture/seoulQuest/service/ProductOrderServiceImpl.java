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
    private final ProductOrderItemRepository productOrderItemRepository;
    private final UserCouponRepository userCouponRepository;

    @Override
    public Long saveOrder(OrderDTO orderDTO) {
        System.out.println(1);
        String email  = orderDTO.getEmail();
        String usedCouponName = orderDTO.getUsedCoupon();

        Member member =memberRepository.findByEmail(email).orElseThrow();
        System.out.println(usedCouponName);

        //이메일과 쿠폰이름으로 유저쿠폰 조회하고 usedate가 null인것만 조회 , 같은 쿠폰이름이 있는경우가 있으면 첫번째 것을 사용.
        UserCoupon userCoupon = userCouponRepository.findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(email,usedCouponName);

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
                .usedCoupon(userCoupon)
                .totalPrice(orderDTO.getTotalPrice())
                .build();
        productOrderRepository.save(productOrder);

        System.out.println(3+ "order된 item들을 저장.");
        //order된 item들을 저장.
        //cart는 결제 까지 완료된 후에 삭제
        orderDTO.getPorderItems().stream().map(i->{
            return ProductOrderItem.builder()
                    .productOrder(productOrder)
                    .pno(i.getPno())
                    .pOrderQty(i.getPqty())
                    .pname(i.getPname())
                    .pprice(i.getPprice())
                    .build();
        }).forEach(i-> productOrderItemRepository.save(i));
        System.out.println(4);

        return productOrder.getPOrderId();
    }
}
