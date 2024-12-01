//package com.positive.culture.seoulQuest.controller;
//
//import com.positive.culture.seoulQuest.domain.Member;
//import com.positive.culture.seoulQuest.dto.OrderDTO;
//import com.positive.culture.seoulQuest.dto.OrderPaymentDTO;
//import com.positive.culture.seoulQuest.service.MemberService;
//import com.positive.culture.seoulQuest.service.ProductOrderService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.security.Principal;
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@Log4j2
//@RequestMapping("/api/admin/order")
//
//
//public class AdminOrderController {
//
//    private final ProductOrderService productOrderService;
//
//    @GetMapping("/orderList")
//    public List<OrderDTO> getAllOrders() {
//        log.info("Fetching all orders for admin");
//        return productOrderService.getAllOrders();
//    }
//
//    @GetMapping("/{orderNumber}")
//    public OrderDTO getOrderDetails(@PathVariable Long orderNumber) {
//        log.info("Fetching details for order: {}", orderNumber);
//        return productOrderService.getOrderDetails(orderNumber);
//    }
//}
