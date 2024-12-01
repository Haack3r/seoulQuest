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
}
