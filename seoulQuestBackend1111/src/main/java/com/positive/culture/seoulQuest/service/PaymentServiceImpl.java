package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.Order;

import com.positive.culture.seoulQuest.domain.PaymentRecord;
import com.positive.culture.seoulQuest.domain.UserCoupon;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.dto.PaymentDTO;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.repository.OrderRepository;
import com.positive.culture.seoulQuest.repository.PaymentRepository;


import com.positive.culture.seoulQuest.repository.UserCouponRepository;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService{

    private final MemberRepository memberRepository;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final UserCouponRepository userCouponRepository;

    //결제 정보를 저장하고, order엔티티의 status를 complete으로 변경함.
    @Override
    public void paymentDone(Payment paymentResponse, OrderDTO paymentdto) {

        try{
            String paymentEmail = paymentResponse.getBuyerEmail();
            Member paymentMember = memberRepository.findByEmail(paymentEmail).orElseThrow();

            Long orderId = paymentdto.getOrderId();
            System.out.println("orderId"+orderId);
            Order order = orderRepository.findById(orderId).orElseThrow();

            order.changePaymentStatus(paymentResponse.getStatus());
            orderRepository.save(order); //order테이블의 paymentState도 변경

            //1.결제정보 저장
            PaymentRecord payment = PaymentRecord.builder()
                    .paymentStatus(paymentResponse.getStatus())
                    .paymentMember(paymentMember)
                    .paymentPrice(paymentResponse.getAmount())
                    .paymentDate(paymentResponse.getPaidAt())
                    .paymentMethod(paymentResponse.getPayMethod())
                    .MerchantUid(paymentResponse.getMerchantUid())
                    .order(order)
                    .build();
            paymentRepository.save(payment);

            //2. orderId로 order를 찾아 해당 Order의 상태와 쿠폰 사용날짜 변경
            //   User가 사용한 쿠폰의 날짜를 오늘날짜로 변경.
            String usedCouponName = paymentdto.getUsedCoupon();
            UserCoupon usedCoupon =
                    userCouponRepository.findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(paymentEmail,usedCouponName);

            if(usedCoupon != null){  // 사용한 쿠폰이 있는지 확인.
                System.out.println(1.5 + "usedCoupon");
                usedCoupon.ChangeUseDate(LocalDate.now()); //오늘 날짜를 저장
                userCouponRepository.save(usedCoupon);
            }

        } catch (Exception e) {
            // 결제 실패 로직
//            handlePaymentFailure(paymentdto);
            throw new RuntimeException("Payment failed", e);
        }
    }

    // 결제 실패 시 처리 로직
    public void handlePaymentFailure(PaymentDTO paymentdto) {
        Long orderId = paymentdto.getOrderDTO().getOrderId();
        Order order = orderRepository.findById(orderId).orElseThrow();

        // 결제 상태를 "failed"로 설정
        order.changePaymentStatus("failed");
        orderRepository.save(order);

        // 쿠폰 사용 취소
        UserCoupon usedCoupon = order.getUsedCoupon();
        if (usedCoupon != null) {
            usedCoupon.ChangeUseDate(null); // 사용날짜를 null로 되돌려 쿠폰을 사용하지 않은 상태로 복구
            userCouponRepository.save(usedCoupon);
        }

    }

}
