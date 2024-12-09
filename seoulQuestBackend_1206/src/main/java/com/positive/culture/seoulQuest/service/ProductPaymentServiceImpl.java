package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.*;

import com.positive.culture.seoulQuest.dto.CartItemListDTO;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.dto.OrderPaymentDTO;
import com.positive.culture.seoulQuest.dto.OrderPaymentItemDTO;
import com.positive.culture.seoulQuest.repository.*;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

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

    // 결제 정보를 저장하고, order엔티티의 status를 complete으로 변경함.
    // 쿠폰 사용 저장
    @Override
    public void paymentDone(Payment paymentResponse, OrderDTO orderdto) {

        try {
            String paymentEmail = paymentResponse.getBuyerEmail();
            Member paymentMember = memberRepository.findByEmail(paymentEmail).orElseThrow();

            Long orderId = orderdto.getOrderId();
            ProductOrder productOrder = productOrderRepository.findById(orderId).orElseThrow();

            // 1. order엔티티의 paymentStatus 변경
            productOrder.changePaymentStatus(paymentResponse.getStatus());
            productOrderRepository.save(productOrder);

            // 2. User가 사용한 쿠폰을 조회하고 사용날짜를 오늘 날짜로 변경
            String usedCouponName = orderdto.getUsedCoupon();
            UserCoupon usedCoupon = null;

            if (usedCouponName != null) {
                // 유저가 사용한 쿠폰 조회
                usedCoupon = userCouponRepository
                        .findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(paymentEmail, usedCouponName);

                // 사용한 쿠폰의 날짜를 변경
                if (usedCoupon != null) {
                    usedCoupon.ChangeUseDate(LocalDate.now());
                    userCouponRepository.save(usedCoupon);
                }
            }

            // 3. 결제정보 저장
            ProductPayment payment = ProductPayment.builder()
                    .pPaymentMember(paymentMember)
                    .totalPrice(orderdto.getTotalPrice())
                    .paymentDate(paymentResponse.getPaidAt())
                    .paymentMethod(paymentResponse.getPayMethod())
                    .productOrder(productOrder)
                    .usedCoupon(usedCoupon)
                    .build();
            productPaymentRepository.save(payment);

            // 4. 해당 유저의 카트를 조회하여, cart에 들어있는 cartitem들 중 결제 완료된 item들은 삭제
            Cart cart = cartRepository.getCartOfMember(paymentEmail).orElseThrow();

            List<Long> pnoList = orderdto.getPorderItems().stream().map(i -> i.getPno()).toList();
            cartItemRepository.deleteByCartCnoAndProductPnoIn(cart.getCno(), pnoList);

            // 5.paymentItem 저장
            // 결제 테이블에 결제내역 저장, product 수량 변경
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

    @Override
    public List<OrderPaymentDTO> getOrderPaymentInfo(Member member) {
        // 1. 회원의 모든 상품 결제 내역 가져오기
        List<ProductPayment> productPayments = productPaymentRepository.findBypPaymentMember(member);

        // 2. OrderPaymentDTO 리스트 생성
        List<OrderPaymentDTO> orderPaymentDTOList = productPayments.stream()
                .map(productPayment -> {
                    // 3. 결제 내역에서 Order 엔티티 관련 정보 가져오기
                    ProductOrder productOrder = productPayment.getProductOrder();
                    if (productOrder == null) {
                        throw new IllegalArgumentException(
                                "ProductOrder not found for payment ID: " + productPayment.getPPaymentId());
                    }

                    // 4. OrderPaymentDTO 빌드
                    OrderPaymentDTO orderPaymentDTO = OrderPaymentDTO.builder()
                            .country(productOrder.getCountry())
                            .state(productOrder.getState())
                            .city(productOrder.getCity())
                            .street(productOrder.getStreet())
                            .zipCode(productOrder.getZipcode())
                            .fullName(productOrder.getRecipientLastName() + " " + productOrder.getRecipientFirstName())
                            .phoneNumber(productOrder.getContactNumber())
                            .paymentDate(productPayment.getPaymentDate().toInstant()
                                    .atZone(ZoneId.systemDefault())
                                    .toLocalDateTime()
                                    .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                            .paymentMethod(productPayment.getPaymentMethod())
                            .totalPrice(productPayment.getTotalPrice())
                            .usedCoupon(Optional.ofNullable(productPayment.getUsedCoupon())
                                    .map(usedCoupon -> usedCoupon.getCoupon().getCouponName())
                                    .orElse(null))
                            .build();

                    // 5. 결제 항목(ProductPaymentItem)을 OrderPaymentItemDTO로 매핑
                    List<OrderPaymentItemDTO> paymentItems = productPaymentItemRepository
                            .findByProductPayment(productPayment)
                            .stream()
                            .map(productPaymentItem -> OrderPaymentItemDTO.builder()
                                    .pname(productPaymentItem.getPname())
                                    .pqty(productPaymentItem.getPPaymentQty())
                                    .pprice(productPaymentItem.getPprice())
                                    .build())
                            .toList();

                    // 6. OrderPaymentDTO에 결제 항목 리스트 설정
                    orderPaymentDTO.setPaymentItems(paymentItems);

                    return orderPaymentDTO;
                })
                .toList();

        // 7. 완성된 OrderPaymentDTO 리스트 반환
        return orderPaymentDTOList;
    }

    // 결제 실패 시 처리 로직
    public void handlePaymentFailure(Payment paymentResponse, OrderDTO orderdto) {
        String paymentEmail = paymentResponse.getBuyerEmail();
        Long orderId = orderdto.getOrderId();
        ProductOrder productOrder = productOrderRepository.findById(orderId).orElseThrow();

        String usedCouponName = orderdto.getUsedCoupon();
        UserCoupon usedCoupon = userCouponRepository
                .findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(paymentEmail, usedCouponName);

        if (usedCoupon != null) {
            usedCoupon.ChangeUseDate(null); // 사용날짜를 null로 되돌려 쿠폰을 사용하지 않은 상태로 복구
            userCouponRepository.save(usedCoupon);
        }

        // 결제 상태를 "failed"로 설정
        productOrder.changePaymentStatus("failed");
        productOrderRepository.save(productOrder);

    }

    @Override
    public List<OrderDTO> getAllOrders() {
        QProductOrder qProductOrder = QProductOrder.productOrder;

        BooleanExpression expression = qProductOrder.paymentStatus.eq("paid");

        List<ProductOrder> productOrders = (List<ProductOrder>) productOrderRepository.findAll(expression);

        return productOrders.stream().map(order -> {
            ProductPayment payment = productPaymentRepository.findByProductOrder(order);

            List<CartItemListDTO> porderItems = productPaymentItemRepository.findByProductPayment(payment)
                    .stream()
                    .map(item -> CartItemListDTO.builder()
                            .pno(item.getProduct().getPno())
                            .pname(item.getPname())
                            .pprice(item.getPprice())
                            .pqty(item.getPPaymentQty())
                            .build())
                    .toList();

            return OrderDTO.builder()
                    .orderId(order.getPOrderId())
                    .firstname(order.getRecipientFirstName())
                    .lastname(order.getRecipientLastName())
                    .phoneNumber(order.getContactNumber())
                    .country(order.getCountry())
                    .totalPrice(order.getTotalPrice())
                    .paymentDate(payment != null
                            ? payment.getPaymentDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime()
                            : null)
                    .porderItems(porderItems)
                    .build();
        }).toList();
    }
}
