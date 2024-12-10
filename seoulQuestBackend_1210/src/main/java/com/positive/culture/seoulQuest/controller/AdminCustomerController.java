package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.dto.CustomerListDTO;
import com.positive.culture.seoulQuest.dto.OrderPaymentDTO;
import com.positive.culture.seoulQuest.service.MemberService;
import com.positive.culture.seoulQuest.service.ProductPaymentService;
import com.positive.culture.seoulQuest.service.TourPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin/customer")
public class AdminCustomerController {
    private final MemberService memberService;
    private final ProductPaymentService productPaymentService;
    private final TourPaymentService tourPaymentService;

    @GetMapping("/list")
    public List<CustomerListDTO> list() {
        return memberService.getAllCustomers();
    }

    @GetMapping("/orders/{email}")
    public List<OrderPaymentDTO> getCustomerOrders(@PathVariable String email) {
        Member member = memberService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));
        return productPaymentService.getOrderPaymentInfo(member);
    }

    @GetMapping("/reservations/{email}")
    public List<OrderPaymentDTO> getCustomerReservations(@PathVariable String email) {
        Member member = memberService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));
        return tourPaymentService.getTourPaymentInfo(member);
    }
}
