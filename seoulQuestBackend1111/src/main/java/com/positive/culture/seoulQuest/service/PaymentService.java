package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.PaymentRecord;
import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.dto.PaymentDTO;
import com.siot.IamportRestClient.response.Payment;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface PaymentService {
    //결제 정보 저장
    public void paymentDone(Payment payment, OrderDTO paymentdto);
}
