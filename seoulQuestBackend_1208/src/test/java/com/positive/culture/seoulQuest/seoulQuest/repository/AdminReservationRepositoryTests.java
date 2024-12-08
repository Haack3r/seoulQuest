package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.TourOrder;
import com.positive.culture.seoulQuest.domain.TourPayment;
import com.positive.culture.seoulQuest.domain.TourPaymentItem;
import com.positive.culture.seoulQuest.repository.TourOrderRepository;
import com.positive.culture.seoulQuest.repository.TourPaymentItemRepository;
import com.positive.culture.seoulQuest.repository.TourPaymentRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Log4j2
public class AdminReservationRepositoryTests {

    @Autowired
    TourOrderRepository tourOrderRepository;

    @Autowired
    TourPaymentRepository tourPaymentRepository;

    @Autowired
    TourPaymentItemRepository tourPaymentItemRepository;

    @Test
    public void getAllReservationsTest() {
        log.info("Fetching all Tour Orders...");

        // Fetch all Tour Orders
        List<TourOrder> tourOrders = tourOrderRepository.findAll();

        for (TourOrder order : tourOrders) {
            log.info("Tour Order ID: {}", order.getTOrderId());
            log.info("Member ID: {}", order.getTOrderMember().getId());
            log.info("Total Price: {}", order.getTotalPrice());
            log.info("Order Date: {}", order.getOrderDate());

            // Fetch related Tour Payments
            TourPayment tourPayment = tourPaymentRepository.findByTourOrder(order);
            if (tourPayment != null) {
                log.info("Payment ID: {}", tourPayment.getTPaymentId());
                log.info("Payment Method: {}", tourPayment.getPaymentMethod());
                log.info("Payment Date: {}", tourPayment.getPaymentDate());

                // Fetch related Tour Payment Items
                List<TourPaymentItem> paymentItems = tourPaymentItemRepository.findByTourPayment(tourPayment);
                for (TourPaymentItem item : paymentItems) {
                    log.info("Tour Name: {}", item.getTname());
                    log.info("Tour Price: {}", item.getTprice());
                    log.info("Tour Date: {}", item.getTdate());
                    log.info("Quantity: {}", item.getTPaymentQty());
                }
            }
        }
    }
}
