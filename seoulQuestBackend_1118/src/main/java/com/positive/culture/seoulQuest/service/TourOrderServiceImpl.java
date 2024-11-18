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
    private final TourOrderItemRepository orderItemRepository;
    private final UserCouponRepository userCouponRepository;

    @Override
    public Long saveOrder(OrderDTO orderDTO) {
        System.out.println(1);
        String email  = orderDTO.getEmail();
        String usedCouponName = orderDTO.getUsedCoupon();

        Member member =memberRepository.findByEmail(email).orElseThrow();
        System.out.println(usedCouponName);
        //userCoupon의 쿠폰 사용날짜는 결제완료 후 저장.
        //이메일과 쿠폰이름으로 유저쿠폰 조회하고 usedate가 null인것만 조회 , 같은 쿠폰이름이 있는경우가 있으면 첫번째 것을 사용.
        UserCoupon userCoupon = userCouponRepository.findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(email,usedCouponName);

        System.out.println(2 + "OrderDTO를 OrderEntity로 변경하여 저장.");
        //OrderDTO를 OrderEntity로 변경하여 저장.
        TourOrder tourOrder = TourOrder.builder()
                .orderDate(LocalDateTime.now())
                .tOrderMember(member)
                .firstName(orderDTO.getFirstname())
                .lastName(orderDTO.getLastname())
                .country(orderDTO.getCountry().trim())
                .phoneNumber(orderDTO.getPhoneNumber().trim())
                .usedCoupon(userCoupon)
                .totalPrice(orderDTO.getTotalPrice())
                .build();
        orderRepository.save(tourOrder);

        System.out.println(3+ "order된 item들을 저장.");

        //프론트에서 카트에 있는 아이템을 조정할수 있으므로 카트엔티티나 카트아이템과의 연관성은 없앰
        orderDTO.getTorderItems().stream().map(i->{

            return TourOrderItem.builder()
                    .tourOrder(tourOrder)
                    .tno(i.getTno())
                    .tOrderQty(i.getTqty())
                    .tname(i.getTname())
                    .tprice(i.getTprice())
                    .tdate(i.getTdate())
                    .build();
        }).forEach(i-> orderItemRepository.save(i));
        System.out.println(4);

        return tourOrder.getTOrderId();
    }
}
