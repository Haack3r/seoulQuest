package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.*;

import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.repository.*;


import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductPaymentServiceImpl implements ProductPaymentService {

    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;
    private final ProductPaymentRepository productPaymentRepository;
    private final ProductOrderRepository productOrderRepository;
    private final UserCouponRepository userCouponRepository;
    private final ProductPaymentItemRepository productPaymentItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    //결제 정보를 저장하고, order엔티티의 status를 complete으로 변경함.
    //쿠폰 사용 저장
    @Override
    public void paymentDone(Payment paymentResponse, OrderDTO orderdto) {

        try{
            String paymentEmail = paymentResponse.getBuyerEmail();
            Member paymentMember = memberRepository.findByEmail(paymentEmail).orElseThrow();

            Long orderId = orderdto.getOrderId();
            System.out.println("orderId"+orderId);
            ProductOrder productOrder = productOrderRepository.findById(orderId).orElseThrow();

            //1. order엔티티의 paymentStatus 변경
            productOrder.changePaymentStatus(paymentResponse.getStatus());
            productOrderRepository.save(productOrder);

            //2. User가 사용한 쿠폰을 조회하고 사용날짜를 오늘 날짜로 변경
            String usedCouponName = orderdto.getUsedCoupon();
            UserCoupon usedCoupon = null;

            if(usedCouponName !=null){
                //유저가 사용한 쿠폰 조회
                usedCoupon =
                        userCouponRepository.findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(paymentEmail,usedCouponName);

                //사용한 쿠폰의 날짜를 변경
                if(usedCoupon != null){
                    usedCoupon.ChangeUseDate(LocalDate.now());
                    userCouponRepository.save(usedCoupon);
                }
            }

            //3. 결제정보 저장
            ProductPayment payment = ProductPayment.builder()
                    .pPaymentMember(paymentMember)
                    .totalPrice(orderdto.getTotalPrice())
                    .paymentDate(paymentResponse.getPaidAt())
                    .paymentMethod(paymentResponse.getPayMethod())
                    .productOrder(productOrder)
                    .usedCoupon(usedCoupon)
                    .build();
            productPaymentRepository.save(payment);

            //4. 해당 유저의 카트를 조회하여, cart에 들어있는 cartitem들 중 결제 완료된 item들은 삭제
            Cart cart = cartRepository.getCartOfMember(paymentEmail).orElseThrow();

            List<Long> pnoList = orderdto.getPorderItems().stream().map(i->i.getPno()).toList();
            cartItemRepository.deleteByCartCnoAndProductPnoIn(cart.getCno(), pnoList);

            //5.paymentItem 저장
            //  결제 테이블에 결제내역 저장, product 수량 변경
            orderdto.getPorderItems().forEach(i -> {
                // 상품 수량 차감
                Product product = productRepository.findById(i.getPno()).orElseThrow();
                int updatedQuantity = product.getPqty() - i.getPqty();
                if (updatedQuantity < 0) {
                    throw new IllegalStateException("Insufficient stock for product: " + product.getPname());
                }
                product.changeQuantity(updatedQuantity);
                productRepository.save(product);

                // 결제 아이템 저장
                ProductPaymentItem productPaymentItem = ProductPaymentItem.builder()
                        .productPayment(payment)
                        .pname(i.getPname())
                        .pPaymentQty(i.getPqty())
                        .pprice(i.getPprice())
                        .product(product)
                        .build();
                productPaymentItemRepository.save(productPaymentItem);
            });

        } catch (Exception e) {
            // 결제 실패 로직
            handlePaymentFailure(paymentResponse, orderdto);
            throw new RuntimeException("Payment failed", e);
        }
    }

    // 결제 실패 시 처리 로직
    public void handlePaymentFailure(Payment paymentResponse,OrderDTO orderdto) {
        String paymentEmail = paymentResponse.getBuyerEmail();
        Long orderId = orderdto.getOrderId();
        ProductOrder productOrder = productOrderRepository.findById(orderId).orElseThrow();

        String usedCouponName = orderdto.getUsedCoupon();
        UserCoupon usedCoupon =
                userCouponRepository.findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(paymentEmail,usedCouponName);

        if (usedCoupon != null) {
            usedCoupon.ChangeUseDate(null); // 사용날짜를 null로 되돌려 쿠폰을 사용하지 않은 상태로 복구
            userCouponRepository.save(usedCoupon);
        }

        // 결제 상태를 "failed"로 설정
        productOrder.changePaymentStatus("failed");
        productOrderRepository.save(productOrder);

    }

}
