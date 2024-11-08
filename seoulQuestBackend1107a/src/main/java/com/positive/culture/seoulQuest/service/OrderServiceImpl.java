package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserCouponRepository userCouponRepository;

    @Override
    public void saveOrder(OrderDTO orderDTO) {
        System.out.println(1);
        String email  = orderDTO.getEmail();
        String usedCouponName = orderDTO.getUsedCoupon();
        int totalPrice = orderDTO.getTotalPrice();

        Member member =memberRepository.findByEmail(email).orElseThrow();
        System.out.println(usedCouponName);
        //userCoupon의 사용한 쿠폰에 날짜를 설정하고 저장.
        //이메일과 쿠폰이름으로 유저쿠폰 조회
        UserCoupon userCoupon = userCouponRepository.findByEmailAndCouponName(email,usedCouponName);
        System.out.println(1.5 + "userCoupon");
        userCoupon.ChangeUseDate(LocalDate.now());
        System.out.println("날짜가 안들어가나");
        userCouponRepository.save(userCoupon);

        System.out.println(2);
        //OrderDTO를 OrderEntity로 변경
        Order order = Order.builder()
                .orderDate(LocalDate.now())
                .orderOwner(member)
                .status(true)
                .usedCoupon(userCoupon)
                .totalPrice(totalPrice)
                .build();
        orderRepository.save(order);
        System.out.println(3);

        orderDTO.getOrderItems().stream().map(i->{
            return OrderItem.builder()
                    .order(order)
                    .pqty(i.getPqty())
                    .pprice(i.getPprice())
                    .build();
        }).forEach(i-> orderItemRepository.save(i));
        System.out.println(4);
    }
}
