package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserCouponRepository userCouponRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public void saveOrder(OrderDTO orderDTO) {
        System.out.println(1);
        String email  = orderDTO.getEmail();
        String usedCouponName = orderDTO.getUsedCoupon();

        Member member =memberRepository.findByEmail(email).orElseThrow();
        System.out.println(usedCouponName);
        //userCoupon의 사용한 쿠폰에 날짜를 설정하고 저장.
        //이메일과 쿠폰이름으로 유저쿠폰 조회하고 usedate가 null인것만 조회 , 같은 쿠폰이름이 있는경우가 있으면 첫번째 것을 사용.
        UserCoupon userCoupon = userCouponRepository.findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(email,usedCouponName);

        //조건 : 조회 된 쿠폰은 use_date값이 null이여야함 =>  사용날짜가 없는 쿠폰이여야함
        if(userCoupon != null){
            System.out.println(1.5 + "userCoupon");
            userCoupon.ChangeUseDate(LocalDate.now()); //오늘 날짜를 저장
            userCouponRepository.save(userCoupon);
        }


        System.out.println(2 + "OrderDTO를 OrderEntity로 변경하여 저장.");
        //OrderDTO를 OrderEntity로 변경하여 저장.
        Order order = Order.builder()
                .orderDate(LocalDateTime.now())
                .orderOwner(member)
                .paymentStatus(true)
                .recipientFirstName(orderDTO.getFirstname())
                .recipientLastName(orderDTO.getLastname())
                .zipcode(orderDTO.getZipcode().trim())
                .street(orderDTO.getStreet().trim())
                .city(orderDTO.getCity().trim())
                .state(orderDTO.getState().trim())
                .country(orderDTO.getCountry().trim())
                .contactNumber(orderDTO.getPhoneNumber().trim())
//                .status(true)
                .paymentMethod(orderDTO.getPaymentMethod())
                .usedCoupon(userCoupon)
                .totalPrice(orderDTO.getTotalPrice())
                .build();
        orderRepository.save(order);



        System.out.println(3+ "order된 item들을 저장.");
        //order된 item들을 저장. , 상품이름 , 카트 아이템 번호? 카트번호?
        //프론트에서 카트에 있는 아이템을 조정할수 있으므로 카트엔티티나 카트아이템과의 연관성은 없앰
        orderDTO.getOrderItems().stream().map(i->{

            return OrderItem.builder()
                    .order(order)
                    .pqty(i.getPqty())
                    .pname(i.getPname())
                    .pprice(i.getPprice())
                    .build();
        }).forEach(i-> orderItemRepository.save(i));
        System.out.println(4);
    }
}
