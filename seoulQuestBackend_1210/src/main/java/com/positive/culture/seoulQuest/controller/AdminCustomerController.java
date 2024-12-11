package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.CustomerListDTO;
import com.positive.culture.seoulQuest.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin/customer")
public class AdminCustomerController {
    private final MemberService memberService;

    @GetMapping("/list")
    public List<CustomerListDTO> list() {
        return memberService.getAllCustomers();
    }
}
