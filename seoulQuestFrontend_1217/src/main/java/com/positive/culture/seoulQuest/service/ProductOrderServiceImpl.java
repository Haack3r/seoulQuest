package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
@Service
@RequiredArgsConstructor
public class ProductOrderServiceImpl implements ProductOrderService {

    private final MemberRepository memberRepository;
    private final ProductOrderRepository productOrderRepository;
    private final UserCouponRepository userCouponRepository;
    private final ProductPaymentRepository productPaymentRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ProductPaymentItemRepository productPaymentItemRepository;

    @Override
    public Long saveOrder(OrderDTO orderDTO) {
        String email = orderDTO.getEmail();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        // 공통: ProductOrder 생성
        ProductOrder productOrder = createProductOrder(orderDTO, member);
        ProductOrder savedOrder = productOrderRepository.save(productOrder);

        // 쿠폰을 사용하여 총 금액이 0 일 경우, import 를 사용하지 않음.
        if (orderDTO.getTotalPrice() == 0) {
            handleCouponPayment(orderDTO, email, member, savedOrder);
        } else {
            System.out.println("import 이용한 결제");
        }

        return savedOrder.getPOrderId();
    }

    private ProductOrder createProductOrder(OrderDTO orderDTO, Member member) {
        return ProductOrder.builder()
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
                .paymentStatus(orderDTO.getTotalPrice() == 0 ? "paid" : "pending")
                .build();
    }

    private void handleCouponPayment(OrderDTO orderDTO, String email, Member member, ProductOrder savedOrder) {
        // 1. 쿠폰 처리
        UserCoupon usedCoupon = processCoupon(orderDTO, email);

        // 2. 결제 정보 저장
        ProductPayment payment = createPayment(orderDTO, member, savedOrder, usedCoupon);
        productPaymentRepository.save(payment);

        // 3. 카트 아이템 삭제
        removeCartItems(orderDTO, email);

        // 4. 결제 아이템 저장 및 상품 수량 업데이트
        savePaymentItems(orderDTO, payment);
    }

    private UserCoupon processCoupon(OrderDTO orderDTO, String email) {
        String usedCouponName = orderDTO.getUsedCoupon();
        if (usedCouponName == null) {
            return null;
        }

        UserCoupon usedCoupon = userCouponRepository
                .findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(email, usedCouponName);

        if (usedCoupon != null) {
            usedCoupon.ChangeUseDate(LocalDate.now());
            userCouponRepository.save(usedCoupon);
        }
        return usedCoupon;
    }

    private ProductPayment createPayment(OrderDTO orderDTO, Member member, ProductOrder savedOrder, UserCoupon usedCoupon) {
        return ProductPayment.builder()
                .pPaymentMember(member)
                .totalPrice(orderDTO.getTotalPrice())
                .paymentDate(new Date())
                .paymentMethod("coupon")
                .productOrder(savedOrder)
                .usedCoupon(usedCoupon)
                .build();
    }

    private void removeCartItems(OrderDTO orderDTO, String email) {
        Cart cart = cartRepository.getCartOfMember(email).orElseThrow();
        List<Long> pnoList = orderDTO.getPorderItems().stream().map(i -> i.getPno()).toList();
        cartItemRepository.deleteByCartCnoAndProductPnoIn(cart.getCno(), pnoList);
    }

    private void savePaymentItems(OrderDTO orderDTO, ProductPayment payment) {
        orderDTO.getPorderItems().forEach(i -> {
            // 상품 수량 업데이트
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
    }
}
