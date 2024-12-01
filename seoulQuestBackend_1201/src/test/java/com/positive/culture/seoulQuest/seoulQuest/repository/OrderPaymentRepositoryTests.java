package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.repository.*;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@SpringBootTest
@Log4j2
public class OrderPaymentRepositoryTests {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ProductOrderRepository productOrderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductPaymentRepository productPaymentRepository;
    @Autowired
    private ProductPaymentItemRepository productPaymentItemRepository;
    @Autowired
    private UserCouponRepository userCouponRepository;
    @Autowired
    private TourRepository tourRepository;
    @Autowired
    private TourOrderRepository tourOrderRepository;
    @Autowired
    private TourPaymentRepository tourPaymentRepository;
    @Autowired
    private TourPaymentItemRepository tourPaymentItemRepository;

    //coupon, userCoupon data 먼저 넣고 넣기
    @Test
    @Transactional
    @Rollback(false)
    public void insertOrderPaymentAndItems() {
        // 1. 모든 멤버, 상품, UserCoupon 데이터 가져오기
        List<Member> members = memberRepository.findAll();
        List<Product> products = productRepository.findAll();
        List<UserCoupon> userCoupons = userCouponRepository.findAll();

        if (members.isEmpty() || products.isEmpty()) {
            System.out.println("Required data (members, products, or user coupons) is missing.");
            return;
        }

        // 2. 멤버 데이터를 기반으로 주문 및 결제 생성
        members.forEach(member -> {
            int totalPrice = 0; // 주문 및 결제 총합 금액
            Set<String> usedProducts = new HashSet<>(); // 중복 상품 방지를 위한 Set

            // 2-1. ProductOrder 생성
            ProductOrder order = ProductOrder.builder()
                    .pOrderMember(member)
                    .recipientFirstName(member.getFirstname())
                    .recipientLastName(member.getLastname())
                    .contactNumber(member.getPhoneNumber())
                    .city(member.getAddress().getCity())
                    .street(member.getAddress().getStreet())
                    .state(member.getAddress().getState())
                    .country(member.getAddress().getCountry())
                    .zipcode(member.getAddress().getZipCode())
                    .orderDate(LocalDateTime.now())
                    .paymentStatus("pending")
                    .build();

            productOrderRepository.save(order);

            // 2-2. ProductPayment 생성
            ProductPayment payment = ProductPayment.builder()
                    .pPaymentMember(member)
                    .productOrder(order)
                    .paymentDate(new Date())
                    .paymentMethod("card")
                    .build();

            productPaymentRepository.save(payment);

            // 3. ProductPaymentItem 생성 및 총합 계산
            for (int i = 0; i < 3; i++) { // 3개의 랜덤 아이템 추가
                Product product;
                do {
                    product = products.get((int) (Math.random() * products.size())); // 랜덤 상품 선택
                } while (usedProducts.contains(product.getPname())); // 중복된 상품이면 다시 선택

                usedProducts.add(product.getPname()); // 상품 이름 추가
                int quantity = 1 + (int) (Math.random() * 5); // 랜덤 수량 설정
                int itemPrice = product.getPprice() * quantity; // 개별 아이템 가격 계산

                ProductPaymentItem paymentItem = ProductPaymentItem.builder()
                        .productPayment(payment)
                        .product(product)
                        .pname(product.getPname())
                        .pprice(product.getPprice())
                        .pPaymentQty(quantity)
                        .build();

                productPaymentItemRepository.save(paymentItem);

                totalPrice += itemPrice; // 총 결제 금액 합산
            }

            // 4. 쿠폰 적용
            UserCoupon applicableCoupon = userCoupons.stream()
                    .filter(c -> c.getCouponOwner().equals(member) && c.getUseDate() == null && c.getCoupon().isActive())
                    .findFirst()
                    .orElse(null);

            if (applicableCoupon != null) {
                int discount = applicableCoupon.getCoupon().getDiscount();
                totalPrice -= discount; // 할인 금액 적용
                totalPrice = Math.max(totalPrice, 100); // 최소결제금액 100원

                // 쿠폰 사용 날짜 업데이트
                applicableCoupon.ChangeUseDate(LocalDate.now());
                userCouponRepository.save(applicableCoupon);

                // 쿠폰 정보를 Payment에 설정
                payment = ProductPayment.builder()
                        .pPaymentId(payment.getPPaymentId())
                        .pPaymentMember(payment.getPPaymentMember())
                        .productOrder(payment.getProductOrder())
                        .usedCoupon(applicableCoupon)
                        .totalPrice(totalPrice)
                        .paymentDate(payment.getPaymentDate())
                        .paymentMethod(payment.getPaymentMethod())
                        .build();

                productPaymentRepository.save(payment);

                System.out.println("Applied Coupon: " + applicableCoupon.getCoupon().getCouponName() + " with Discount: " + discount);
            }

            // 5. 총 금액 설정
            order.changeTotalPrice(totalPrice);
            payment.changeTotalPrice(totalPrice);

            productOrderRepository.save(order);
            productPaymentRepository.save(payment);

            System.out.println("Saved ProductOrder with totalPrice: " + totalPrice);
            System.out.println("Saved ProductPayment with totalPrice: " + totalPrice);
        });
    }


    @Test
    @Transactional
    public void testInsertOrderPaymentItemsForAllMembers() {
        // Step 1: Fetch all members and tours
        List<Member> members = memberRepository.findAll();
        List<Tour> tours = tourRepository.findAll();

        if (members.isEmpty() || tours.isEmpty()) {
            log.warn("No members or tours found for testing");
            return;
        }

        // Step 2: Loop through each member
        members.forEach(member -> {
            // Create 1 order per member
            TourOrder tourOrder = TourOrder.builder()
                    .tOrderMember(member)
                    .totalPrice(0) // Initialize with 0; total will be calculated later
                    .firstName(member.getFirstname())
                    .lastName(member.getLastname())
                    .phoneNumber(member.getPhoneNumber())
                    .country("USA")
                    .paymentStatus("paid")
                    .build();
            tourOrderRepository.save(tourOrder);

            // Initialize totalPrice accumulator
            int totalPaymentPrice = 0;

            // Create a payment for the order
            TourPayment tourPayment = TourPayment.builder()
                    .tPaymentMember(member)
                    .tourOrder(tourOrder)
                    .totalPrice(0) // Initialize with 0; total will be updated later
                    .paymentMethod("Card")
                    .paymentDate(new Date())
                    .build();
            tourPaymentRepository.save(tourPayment);

            // Add payment items for the member
            for (int i = 0; i < 3; i++) { // Example: 3 payment items per member
                Tour tour = tours.get((int) (Math.random() * tours.size())); // Random tour

                int quantity = 1 + (int) (Math.random() * 3); // Random quantity (1~3)
                int itemTotalPrice = tour.getTprice() * quantity; // Calculate total price for this item

                // Update the total payment price
                totalPaymentPrice += itemTotalPrice;

                // Create the payment item
                TourPaymentItem paymentItem = TourPaymentItem.builder()
                        .tourPayment(tourPayment)
                        .tour(tour)
                        .tname(tour.getTname())
                        .tprice(tour.getTprice())
                        .tdate(tour.getTDate().get(1).getTourDate()) // Random reservation date
                        .tPaymentQty(quantity) // Set quantity
                        .build();
                tourPaymentItemRepository.save(paymentItem);
            }

            // Update total price for TourPayment
            tourPayment.changeTotalPrice(totalPaymentPrice);
            tourPaymentRepository.save(tourPayment);

            tourOrder.changeTotalPrice(totalPaymentPrice);
            tourOrderRepository.save(tourOrder);

            // Log the results
            log.info("Inserted TourOrder for Member: " + member.getEmail());
            log.info("Inserted TourPayment for Member: " + member.getEmail() + ", Total Price: " + totalPaymentPrice);
        });
    }

}
