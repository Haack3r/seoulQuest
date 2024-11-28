package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.repository.*;
import com.siot.IamportRestClient.response.Payment;
import jdk.swing.interop.SwingInterOpUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TourPaymentServiceImpl implements TourPaymentService {

    private final MemberRepository memberRepository;
    private final TourPaymentRepository paymentRepository;
    private final TourOrderRepository tourOrderRepository;
    private final UserCouponRepository userCouponRepository;
    private final TourPaymentItemRepository paymentItemRepository;
    private final ReservationRepository reservationRepository;
    private final ReservationItemRepository reservationItemRepository;
    private final TourDateRepository tourDateRepository;
    private final TourRepository tourRepository;

    //결제 정보를 저장하고, order엔티티의 status를 complete으로 변경함.
    @Override
    public void paymentDone(Payment paymentResponse, OrderDTO orderdto) {

        try{
            String paymentEmail = paymentResponse.getBuyerEmail();
            Member paymentMember = memberRepository.findByEmail(paymentEmail).orElseThrow();

            Long orderId = orderdto.getOrderId();
            System.out.println("orderId"+orderId);
            TourOrder tourOrder = tourOrderRepository.findById(orderId).orElseThrow();

            tourOrder.changePaymentStatus(paymentResponse.getStatus());
            tourOrderRepository.save(tourOrder);

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

            //1.결제정보 저장
            TourPayment payment = TourPayment.builder()
                    .tPaymentMember(paymentMember)
                    .totalPrice(orderdto.getTotalPrice())
                    .paymentDate(paymentResponse.getPaidAt())
                    .paymentMethod(paymentResponse.getPayMethod())
                    .tourOrder(tourOrder)
                    .usedCoupon(usedCoupon)
                    .build();
            paymentRepository.save(payment);

            //3. 해당 유저의 reservation를 조회하여, reservation에 들어있는 item들 중 결제 완료된 item들은 삭제
            Reservation reservation = reservationRepository.getReservationOfMember(paymentEmail).orElseThrow();

            //결제 완료시 , 투어번호에 해당하는 reservationItem 삭제
            List<Long> tnoList = orderdto.getTorderItems().stream().map(i->i.getTno()).toList();
            reservationItemRepository.deleteByReservationRnoAndTourTnoIn(reservation.getRno(),tnoList);

            orderdto.getTorderItems().forEach(i -> {
                System.out.println(i.getTdate());
                // TourDate 조회
                TourDate tourDate = tourDateRepository.findByTourDateAndTourTno(i.getTdate(), i.getTno())
                        .orElseThrow(() -> new IllegalArgumentException("TourDate not found for Tno=" + i.getTno() + ", Date=" + i.getTdate()));
                System.out.println("tourDate"+tourDate);

                // 수량 계산
                int newCapacity = tourDate.getAvailableCapacity() - i.getTqty();
                if (newCapacity < 0) {
                    throw new IllegalStateException("Insufficient capacity for TourDate: " + tourDate);
                }

                System.out.println("Updating TourDate capacity: Old=" + tourDate.getAvailableCapacity() + ", New=" + newCapacity);

                // 수량 변경 및 저장
                tourDate.changeAvailableCapacity(newCapacity);
                tourDateRepository.save(tourDate);

                Tour tour = tourRepository.findById(i.getTno()).orElseThrow();

                // PaymentItem 저장
                TourPaymentItem tourPaymentItem = TourPaymentItem.builder()
                        .tourPayment(payment)
                        .tname(i.getTname())
                        .tPaymentQty(i.getTqty())
                        .tprice(i.getTprice())
                        .tdate(i.getTdate())
                        .tour(tour)
                        .build();
                paymentItemRepository.save(tourPaymentItem);
            });
        } catch (Exception e) {
            // 결제 실패 로직
            handlePaymentFailure(paymentResponse,orderdto);
            throw new RuntimeException("Payment failed", e);
        }
    }

    // 결제 실패 시 처리 로직
    public void handlePaymentFailure(Payment paymentResponse,OrderDTO orderdto) {
        String paymentEmail = paymentResponse.getBuyerEmail();
        Long orderId = orderdto.getOrderId();
        TourOrder tourOrder = tourOrderRepository.findById(orderId).orElseThrow();

        String usedCouponName = orderdto.getUsedCoupon();
        UserCoupon usedCoupon =
                userCouponRepository.findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(paymentEmail,usedCouponName);

        if (usedCoupon != null) {
            usedCoupon.ChangeUseDate(null); // 사용날짜를 null로 되돌려 쿠폰을 사용하지 않은 상태로 복구
            userCouponRepository.save(usedCoupon);
        }

        // 결제 상태를 "failed"로 설정
        tourOrder.changePaymentStatus("failed");
        tourOrderRepository.save(tourOrder);

    }

}
