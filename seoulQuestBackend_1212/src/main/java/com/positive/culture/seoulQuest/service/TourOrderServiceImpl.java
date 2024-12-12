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
public class TourOrderServiceImpl implements TourOrderService {

    private final MemberRepository memberRepository;
    private final TourOrderRepository tourOrderRepository;
    private final UserCouponRepository userCouponRepository;
    private final TourPaymentRepository tourPaymentRepository;
    private final ReservationRepository reservationRepository;
    private final ReservationItemRepository reservationItemRepository;
    private final TourRepository tourRepository;
    private final TourPaymentItemRepository tourPaymentItemRepository;

    @Override
    public Long saveOrder(OrderDTO orderDTO) {
        String email  = orderDTO.getEmail();
        Member member =memberRepository.findByEmail(email).orElseThrow();

        // 공통: TourOrder 생성
        TourOrder tourOrder = createTourOrder(orderDTO, member);
        TourOrder savedOrder = tourOrderRepository.save(tourOrder);

        //쿠폰을 사용하여 총 금액이 0일 경우, import를 사용하지 않음.
        if(orderDTO.getTotalPrice() == 0 ){
            handleCouponPayment(orderDTO, email, member, savedOrder);
        }else {
            System.out.println("import 이용한 결제");
        }

        return tourOrder.getTOrderId();
    }

    private TourOrder createTourOrder(OrderDTO orderDTO, Member member) {
        return TourOrder.builder()
                .orderDate(LocalDateTime.now())
                .tOrderMember(member)
                .firstName(orderDTO.getFirstname())
                .lastName(orderDTO.getLastname())
                .country(orderDTO.getCountry().trim())
                .phoneNumber(orderDTO.getPhoneNumber().trim())
                .totalPrice(orderDTO.getTotalPrice())
                .paymentStatus(orderDTO.getTotalPrice() == 0 ? "paid": "pending")
                .build();
    }

    private void handleCouponPayment(OrderDTO orderDTO, String email, Member member, TourOrder savedOrder){
        //1. 쿠폰 처리
        UserCoupon usedCoupon = processCoupon(orderDTO, email);

        //2. 결제 정보 저장
        TourPayment payment = createPayment(orderDTO, member, savedOrder, usedCoupon);
        tourPaymentRepository.save(payment);

        //3. Reservation 아이템 삭제
        removeReservationItmes(orderDTO, email);

        //4. 결제 아이템 저장 및 투어 수량 업데이트
        savePaymentItems(orderDTO, payment);
    }

    private UserCoupon processCoupon(OrderDTO orderDTO, String email){
        String usedCouponName = orderDTO.getUsedCoupon();
        if(usedCouponName == null){
            return null;
        }

        UserCoupon usedCoupon = userCouponRepository
                .findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(email, usedCouponName);

        if (usedCoupon != null){
            usedCoupon.ChangeUseDate(LocalDate.now());
            userCouponRepository.save(usedCoupon);
        }
        return usedCoupon;
    }

    private TourPayment createPayment(OrderDTO orderDTO , Member member , TourOrder savedOrder , UserCoupon usedCoupon){
        return TourPayment.builder()
                .tPaymentMember(member)
                .totalPrice(orderDTO.getTotalPrice())
                .paymentDate(new Date())
                .paymentMethod("coupon")
                .tourOrder(savedOrder)
                .usedCoupon(usedCoupon)
                .build();
    }

    private void removeReservationItmes(OrderDTO orderDTO, String email){
        Reservation reservation = reservationRepository.getReservationOfMember(email).orElseThrow();
        List<Long> tnoList = orderDTO.getTorderItems().stream().map(i->i.getTno()).toList();
        reservationItemRepository.deleteByReservationRnoAndTourTnoIn(reservation.getRno(), tnoList);
    }

    private void savePaymentItems(OrderDTO orderDTO, TourPayment payment){
        orderDTO.getTorderItems().forEach(i->{
            //투어 수량 업데이트
            Tour tour =  tourRepository.findById(i.getTno()).orElseThrow();
            TourDate tourDate = tour.getTourDateList().stream()
                    .filter( date -> date.getTdate().equals(i.getTdate()))
                    .findFirst()
                    .orElseThrow(() -> new IllegalArgumentException("TourDate not found for date: " + i.getTdate()));

            int updatedQuantity = tourDate.getAvailableCapacity() - i.getTqty();
            if (updatedQuantity < 0) {
                throw new IllegalStateException("Insufficient capacity for TourDate: " + tourDate);
            }

            tour.updateAvailableCapacity(tourDate.getTdate(),updatedQuantity);
            tourRepository.save(tour);

            // PaymentItem 저장
            TourPaymentItem tourPaymentItem = TourPaymentItem.builder()
                    .tourPayment(payment)
                    .tname(i.getTname())
                    .tPaymentQty(i.getTqty())
                    .tprice(i.getTprice())
                    .tdate(i.getTdate())
                    .tour(tour)
                    .build();
            tourPaymentItemRepository.save(tourPaymentItem);

        });
    }
}
