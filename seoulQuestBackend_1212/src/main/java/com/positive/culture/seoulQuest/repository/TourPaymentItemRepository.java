package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.ProductPaymentItem;
import com.positive.culture.seoulQuest.domain.TourPayment;
import com.positive.culture.seoulQuest.domain.TourPaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TourPaymentItemRepository extends JpaRepository<TourPaymentItem, Long> {
        // 결제된 tour 들의 목록을 찾음
        List<TourPaymentItem> findByTourPaymentIn(List<TourPayment> payments);

        @Query("SELECT DISTINCT t.tour.tno, t.tour.tname, t.tprice, SUM(t.tPaymentQty) AS totalReservations " +
                        "FROM TourPaymentItem t " +
                        "GROUP BY t.tour.tno, t.tour.tname, t.tprice " +
                        "ORDER BY totalReservations DESC")
        List<Object[]> findTopReservedTours();

        List<TourPaymentItem> findByTourPayment(TourPayment tourPayment);

        @Query("SELECT SUM(tpi.tprice * tpi.tPaymentQty) FROM TourPaymentItem tpi")
        Long calculateTotalRevenue();

        @Query("SELECT COUNT(tpi) FROM TourPaymentItem tpi WHERE DATE(tpi.tourPayment.paymentDate) = CURRENT_DATE")
        Long countTodayTours();

        @Query(value = "SELECT DISTINCT t.tno as tourId, tr.tname as tourName, " +
                        "SUM(t.t_payment_qty) AS reservationCount, " +
                        "SUM(t.tprice * t.t_payment_qty) AS totalRevenue " +
                        "FROM tbl_tour_payment_item t " +
                        "JOIN tbl_tours tr ON t.tno = tr.tno " +
                        "JOIN tbl_tour_payment tp ON t.t_payment_id = tp.t_payment_id " +
                        "WHERE tp.payment_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) " +
                        "GROUP BY t.tno, tr.tname " +
                        "ORDER BY totalRevenue DESC", nativeQuery = true)
        List<Object[]> findWeeklyTopRevenueTours();

        // TourPaymentItemRepository.java
        @Query("SELECT SUM(tpi.tprice * tpi.tPaymentQty) FROM TourPaymentItem tpi " +
                        "WHERE tpi.tourPayment.paymentDate BETWEEN :startDate AND :endDate")
        Long calculateLastWeekTourRevenue(
                        @Param("startDate") LocalDateTime startDate,
                        @Param("endDate") LocalDateTime endDate);
}
