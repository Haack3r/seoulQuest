package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.dto.OrderPaymentDTO;
import com.siot.IamportRestClient.response.Payment;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface TourPaymentService {
    //결제 정보 저장
    public void paymentDone(Payment payment, OrderDTO orderdto);
    public List<OrderPaymentDTO> getTourPaymentInfo(Member member);
<<<<<<<< HEAD:seoulQuestBackend_1202/src/main/java/com/positive/culture/seoulQuest/service/TourPaymentService.java
    // Fetch all reservations for admin
    List<OrderDTO> getAllReservations();
========
>>>>>>>> c85e02191e4587f3b5c1c2b3f08dfcf00fb02866:seoulQuestBackend_1201/src/main/java/com/positive/culture/seoulQuest/service/TourPaymentService.java
}
