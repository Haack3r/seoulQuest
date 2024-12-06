package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.OrderDTO;
import com.positive.culture.seoulQuest.service.TourPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin/reservation")
public class AdminReservationController {
    private final TourPaymentService tourPaymentService;

    // Fetch all reservations for admin
    @GetMapping("/list")
    public List<OrderDTO> getAllReservations() {
        log.info("Fetching all reservations for admin");
        return tourPaymentService.getAllReservations();
    }
}