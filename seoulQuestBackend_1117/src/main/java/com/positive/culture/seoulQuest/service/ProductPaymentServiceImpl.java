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
    @Override
    public void paymentDone(Payment paymentResponse, OrderDTO orderdto) {

        try{
            String paymentEmail = paymentResponse.getBuyerEmail();
            Member paymentMember = memberRepository.findByEmail(paymentEmail).orElseThrow();

            Long orderId = orderdto.getOrderId();
            System.out.println("orderId"+orderId);
            ProductOrder productOrder = productOrderRepository.findById(orderId).orElseThrow();

            productOrder.changePaymentStatus(paymentResponse.getStatus());
            productOrderRepository.save(productOrder); //order테이블의 paymentState도 변경

            //1.결제정보 저장
            ProductPayment payment = ProductPayment.builder()
                    .paymentStatus(paymentResponse.getStatus())
                    .pPaymentMember(paymentMember)
                    .paymentPrice(paymentResponse.getAmount())
                    .paymentDate(paymentResponse.getPaidAt())
                    .paymentMethod(paymentResponse.getPayMethod())
                    .merchantUid(paymentResponse.getMerchantUid())
                    .productOrder(productOrder)
                    .build();
            productPaymentRepository.save(payment);

            //2. orderId로 order를 찾아 해당 Order의 상태와 쿠폰 사용날짜 변경
            //   User가 사용한 쿠폰의 날짜를 오늘날짜로 변경.
            String usedCouponName = orderdto.getUsedCoupon();
            UserCoupon usedCoupon =
                    userCouponRepository.findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(paymentEmail,usedCouponName);

            if(usedCoupon != null){  // 사용한 쿠폰이 있는지 확인.
                System.out.println(1.5 + "usedCoupon");
                usedCoupon.ChangeUseDate(LocalDate.now()); //오늘 날짜를 저장
                userCouponRepository.save(usedCoupon);
            }

            //3. 해당 유저의 카트를 조회하여, cart에 들어있는 cartitem들 중 결제 완료된 item들은 삭제
            Cart cart = cartRepository.getCartOfMember(paymentEmail).orElseThrow();
            System.out.println("cart " + cart);
            //결제 완료시 , 상품번호에 해당하는 카트아이템들 삭제
            System.out.println(orderdto.getPOrderItems());// 여기에 안들어옴 ~~~~~~~~~~~


            List<Long> pnoList = orderdto.getPOrderItems().stream().map(i->i.getPno()).toList();
            cartItemRepository.deleteByCartCnoAndProductPnoIn(cart.getCno(), pnoList);
            System.out.println("삭제 완료");
//            orderdto.getPOrderItems().forEach(j->{
//                //결제 완료시, product의 pqty를 결제한 수량만큼 -함.
//                pnoList.forEach(i-> {
//                    Product product = productRepository.findById(i).orElseThrow();
//                    product.changeQuantity(product.getPqty()-j.getPqty());
//                    productRepository.save(product);
//                });
//            });

            //4.paymentItem 저장
            //4. 결제 테이블에 결제내역 저장, product 수량 변경
            orderdto.getPOrderItems().forEach(i->{
                System.out.println("2) 여기가 안되나 "+ i);
                ProductPaymentItem productPaymentItem = ProductPaymentItem.builder()
                        .productPayment(payment)
                        .pname(i.getPname())
                        .pqty(i.getPqty())
                        .pprice(i.getPprice())
                        .build();
                productPaymentItemRepository.save(productPaymentItem);

                System.out.println("3) 여기가 안되나" + i);
                //결제 완료시, product의 pqty를 결제한 수량만큼 -함.
                pnoList.forEach(j-> {
                    System.out.println("여기서 수량이 바뀌어야함1: " + i.getPqty());
                    Product product = productRepository.findById(j).orElseThrow();
                    System.out.println("여기서 수량이 바뀌어야함2: " + product.getPqty());
                    product.changeQuantity(product.getPqty()-i.getPqty());
                    productRepository.save(product);
                });
            });

        } catch (Exception e) {
            // 결제 실패 로직
            handlePaymentFailure(orderdto);
            throw new RuntimeException("Payment failed", e);
        }
    }

    // 결제 실패 시 처리 로직
    public void handlePaymentFailure(OrderDTO orderdto) {
        Long orderId = orderdto.getOrderId();
        ProductOrder productOrder = productOrderRepository.findById(orderId).orElseThrow();

        // 결제 상태를 "failed"로 설정 , usedCoupon도 null로 변경
        productOrder.changePaymentStatus("failed");
        productOrderRepository.save(productOrder);

        // 쿠폰 사용 취소
        UserCoupon usedCoupon = productOrder.getUsedCoupon();
        if (usedCoupon != null) {
            usedCoupon.ChangeUseDate(null); // 사용날짜를 null로 되돌려 쿠폰을 사용하지 않은 상태로 복구
            userCouponRepository.save(usedCoupon);
        }

    }

}
