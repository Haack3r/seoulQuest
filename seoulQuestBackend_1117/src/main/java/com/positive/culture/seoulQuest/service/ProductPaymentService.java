package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.siot.IamportRestClient.response.Payment;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ProductPaymentService {
    //결제 정보 저장
    public void paymentDone(Payment payment, OrderDTO orderdto);
}
