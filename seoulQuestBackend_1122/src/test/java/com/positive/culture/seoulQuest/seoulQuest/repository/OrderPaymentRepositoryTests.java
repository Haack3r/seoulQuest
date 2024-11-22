package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.ProductOrder;
import com.positive.culture.seoulQuest.domain.ProductPayment;
import com.positive.culture.seoulQuest.repository.*;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@SpringBootTest
@Log4j2
public class OrderPaymentRepositoryTests {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProductOrderRepository productOrderRepository;

    @Autowired
    private ProductPaymentRepository productPaymentRepository;

    @Autowired
    private ProductPaymentItemRepository productPaymentItemRepository;

    @Autowired
    private UserCouponRepository userCouponRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void insertOrder(){
        // 1. 멤버 데이터 가져오기
        List<Member> members = memberRepository.findAll();
        System.out.println("Members Count: " + members.size());

        // 2. 멤버 데이터를 기반으로 주문 데이터 생성
        members.forEach(member -> {
            ProductOrder order = ProductOrder.builder()
                    .pOrderMember(member)
                    .totalPrice((int)(member.getId() * 1000))
                    .recipientFirstName(member.getFirstname())
                    .recipientLastName(member.getLastname())
                    .contactNumber(member.getPhoneNumber())
                    .city(member.getAddress().getCity())
                    .street(member.getAddress().getStreet())
                    .state(member.getAddress().getState())
                    .country(member.getAddress().getCountry())
                    .zipcode(member.getAddress().getZipCode())
                    .orderDate(LocalDateTime.now())
                    .paymentStatus("paid")
                    .build();

            // 데이터 저장
            productOrderRepository.save(order);
            System.out.println("Saved ProductOrder: " + order);
        });
    }

    @Test
    @Transactional
    @Rollback(false)
    public void insertPaymentData() {
        // 1. 모든 주문 데이터 가져오기
        List<ProductOrder> orders = productOrderRepository.findAll();

        // 2. 주문 데이터를 기반으로 결제 데이터 생성
        orders.forEach(order -> {
            ProductPayment payment = ProductPayment.builder()
                    .pPaymentMember(order.getPOrderMember()) // 주문과 연결된 회원 정보
                    .productOrder(order) // 주문 정보 연결
                    .merchantUid(UUID.randomUUID().toString()) // 고유한 결제 ID 생성
                    .paymentPrice(order.getTotalPrice())
                    .paymentDate(new java.util.Date()) // 현재 시간으로 결제 날짜 설정
                    .paymentMethod("card") // 결제 방법
                    .pPaymentMember(order.getPOrderMember())
//                    .usedCoupon()
                    .build();

            // 데이터 저장
            productPaymentRepository.save(payment);
            System.out.println("Saved ProductPayment: " + payment);
        });
    }

}
