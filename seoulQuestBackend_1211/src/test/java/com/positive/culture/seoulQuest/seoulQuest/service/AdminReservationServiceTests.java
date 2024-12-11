package com.positive.culture.seoulQuest.seoulQuest.service;

import com.positive.culture.seoulQuest.service.TourPaymentService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Log4j2
public class AdminReservationServiceTests {

    @Autowired
    private TourPaymentService tourPaymentService;

    @Test
    public void testGetAllReservations() {
        var reservations = tourPaymentService.getAllReservations();
        reservations.forEach(reservation -> log.info("Reservation: {}", reservation));
    }
}
