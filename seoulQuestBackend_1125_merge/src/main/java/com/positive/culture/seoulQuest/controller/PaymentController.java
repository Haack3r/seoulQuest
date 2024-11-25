//package com.positive.culture.seoulQuest.controller;
//
//import com.positive.culture.seoulQuest.dto.OrderDTO;
//import com.siot.IamportRestClient.IamportClient;
//import com.siot.IamportRestClient.exception.IamportResponseException;
//import com.siot.IamportRestClient.response.IamportResponse;
//import com.siot.IamportRestClient.response.Payment;
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.web.bind.annotation.*;
//
//import java.io.IOException;
//
//@RestController
//@RequestMapping("/api/payment")
//@RequiredArgsConstructor
//@Log4j2
//public class PaymentController {
//
//    private IamportClient iamportClient;
//
//
//
//    @Value("${iamport.api_key}")
//    private String apiKey;
//
//    @Value("${iamport.api_secret}")
//    private String secretKey;
//
//    //api 클라이언트 생성
//    @PostConstruct
//    public void init() {
//        // IamportClient 초기화
//        this.iamportClient = new IamportClient(apiKey, secretKey);
//    }
//    //==============================================================
//
//    @PostMapping("/{imp_uid}")
//    public IamportResponse<Payment> validateIamport(@PathVariable String imp_uid, @RequestBody OrderDTO request) throws IamportResponseException, IOException {
//
//        IamportResponse<Payment> payment = iamportClient.paymentByImpUid(imp_uid);;
//
//        log.info("결제 요청 응답. 결제 내역 - 주문 번호: {}", payment.getResponse().getMerchantUid());
//
//        paymentService.processPaymentDone(request);
//
//        return payment;
//    }
//
//
//}
