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
public class TourPaymentServiceImpl implements TourPaymentService {

    private final MemberRepository memberRepository;
    private final TourPaymentRepository paymentRepository;
    private final TourOrderRepository tourOrderRepository;
    private final UserCouponRepository userCouponRepository;
    private final TourPaymentItemRepository paymentItemRepository;
    private final ReservationRepository reservationRepository;
    private final ReservationItemRepository reservationItemRepository;
    private final TourDateRepository tourDateRepository;

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
            tourOrderRepository.save(tourOrder); //order테이블의 paymentState도 변경

            //1.결제정보 저장
            TourPayment payment = TourPayment.builder()
                    .paymentStatus(paymentResponse.getStatus())
                    .tPaymentMember(paymentMember)
                    .paymentPrice(paymentResponse.getAmount())
                    .paymentDate(paymentResponse.getPaidAt())
                    .paymentMethod(paymentResponse.getPayMethod())
                    .merchantUid(paymentResponse.getMerchantUid())
                    .tourOrder(tourOrder)
                    .build();
            paymentRepository.save(payment);

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

            //3. 해당 유저의 reservation를 조회하여, reservation에 들어있는 item들 중 결제 완료된 item들은 삭제
            Reservation reservation = reservationRepository.getReservationOfMember(paymentEmail).orElseThrow();

            //결제 완료시 , 투어번호에 해당하는 reservationItem 삭제
            List<Long> tnoList = orderdto.getTOrderItems().stream().map(i->i.getTno()).toList();
            reservationItemRepository.deleteByReservationRnoAndTourTnoIn(reservation.getRno(),tnoList);


            orderdto.getTOrderItems().forEach(i->{
                //4.paymentItem 저장
                TourPaymentItem tourPaymentItem = TourPaymentItem.builder()
                        .tourPayment(payment)
                        .tname(i.getTname())
                        .tqty(i.getTqty())
                        .tprice(i.getTprice())
                        .tdate(i.getTdate())
                        .build();
                paymentItemRepository.save(tourPaymentItem);

                //5.해당 tour의 tourdate의 available capacity 변경 (결제 갯수만큼 마이너스)
                //tour와 tourdate가 모두 일치하는 데이터를 찾아야함.
                TourDate tourDate = tourDateRepository.findByTourDateAndTourTno(i.getTdate(),i.getTno()).orElseThrow();
                tourDate.changeAvailableCapacity(tourDate.getAvailableCapacity()-i.getTqty());
                tourDateRepository.save(tourDate);
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
        TourOrder tourOrder = tourOrderRepository.findById(orderId).orElseThrow();

        // 결제 상태를 "failed"로 설정
        tourOrder.changePaymentStatus("failed");
        tourOrderRepository.save(tourOrder);

        // 쿠폰 사용 취소
        UserCoupon usedCoupon = tourOrder.getUsedCoupon();
        if (usedCoupon != null) {
            usedCoupon.ChangeUseDate(null); // 사용날짜를 null로 되돌려 쿠폰을 사용하지 않은 상태로 복구
            userCouponRepository.save(usedCoupon);
        }

    }

}
