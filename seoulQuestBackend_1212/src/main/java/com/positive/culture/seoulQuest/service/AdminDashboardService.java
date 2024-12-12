package com.positive.culture.seoulQuest.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.positive.culture.seoulQuest.dto.DashboardStatisticsDTO;
import com.positive.culture.seoulQuest.dto.TopReservedTourDTO;
import com.positive.culture.seoulQuest.dto.TopSellingProductDTO;
import com.positive.culture.seoulQuest.repository.ProductPaymentItemRepository;
import com.positive.culture.seoulQuest.repository.ReservationItemRepository;
import com.positive.culture.seoulQuest.repository.TourPaymentItemRepository;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

        private final ProductPaymentItemRepository productPaymentItemRepository;
        private final TourPaymentItemRepository tourPaymentItemRepository;
        private final ReservationItemRepository reservationItemRepository;

        // @Transactional(readOnly = true)
        // public DashboardStatisticsDTO getDashboardStatistics() {
        // Long productRevenue = productPaymentItemRepository.calculateTotalRevenue();
        // Long tourRevenue = tourPaymentItemRepository.calculateTotalRevenue();
        // Long totalRevenue = (productRevenue != null ? productRevenue : 0L) +
        // (tourRevenue != null ? tourRevenue : 0L);
        // Long tourCount = reservationItemRepository.countTodayTours();
        // Long productCount = productPaymentItemRepository.countTodayProducts();

        // return DashboardStatisticsDTO.builder()
        // .totalRevenue(totalRevenue != null ? totalRevenue : 0L)
        // .tourCount(tourCount != null ? tourCount : 0L)
        // .productCount(productCount != null ? productCount : 0L)
        // .build();
        // }
        @Transactional(readOnly = true)
        public DashboardStatisticsDTO getDashboardStatistics() {
                LocalDateTime now = LocalDateTime.now();

                // 이번 주의 시작과 끝
                LocalDateTime currentWeekStart = now
                                .with(java.time.temporal.TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY))
                                .withHour(0).withMinute(0).withSecond(0);
                LocalDateTime currentWeekEnd = now;

                // 지난 주의 시작과 끝
                LocalDateTime lastWeekStart = currentWeekStart.minusWeeks(1);
                LocalDateTime lastWeekEnd = currentWeekStart.minusSeconds(1);

                // 현재 주의 매출
                Long productRevenue = productPaymentItemRepository.calculateLastWeekProductRevenue(
                                currentWeekStart, currentWeekEnd);
                Long tourRevenue = tourPaymentItemRepository.calculateLastWeekTourRevenue(
                                currentWeekStart, currentWeekEnd);
                Long totalRevenue = (productRevenue != null ? productRevenue : 0L) +
                                (tourRevenue != null ? tourRevenue : 0L);

                // 지난 주의 매출
                Long lastWeekProductRevenue = productPaymentItemRepository.calculateLastWeekProductRevenue(
                                lastWeekStart, lastWeekEnd);
                Long lastWeekTourRevenue = tourPaymentItemRepository.calculateLastWeekTourRevenue(
                                lastWeekStart, lastWeekEnd);
                Long lastWeekTotalRevenue = (lastWeekProductRevenue != null ? lastWeekProductRevenue : 0L) +
                                (lastWeekTourRevenue != null ? lastWeekTourRevenue : 0L);

                // 매출 성장률 계산
                double revenueGrowth = lastWeekTotalRevenue != 0
                                ? ((double) (totalRevenue - lastWeekTotalRevenue) / lastWeekTotalRevenue) * 100
                                : 0;

                Long tourCount = reservationItemRepository.countTodayTours();
                Long productCount = productPaymentItemRepository.countTodayProducts();

                return DashboardStatisticsDTO.builder()
                                .totalRevenue(totalRevenue != null ? totalRevenue : 0L)
                                .tourCount(tourCount != null ? tourCount : 0L)
                                .productCount(productCount != null ? productCount : 0L)
                                .revenueGrowth(revenueGrowth)
                                .build();
        }

        @Transactional(readOnly = true)
        public List<TopSellingProductDTO> getTopSellingProducts() {
                List<Object[]> results = productPaymentItemRepository.findWeeklyTopSellingProducts();
                return results.stream()
                                .map(result -> TopSellingProductDTO.builder()
                                                .productId((Long) result[0])
                                                .productName((String) result[1])
                                                .salesCount(((Number) result[2]).intValue())
                                                .build())
                                .collect(Collectors.toList());
        }

        @Transactional(readOnly = true)
        public List<TopReservedTourDTO> getTopReservedTours() {
                List<Object[]> results = tourPaymentItemRepository.findWeeklyTopRevenueTours();
                return results.stream()
                                .map(result -> TopReservedTourDTO.builder()
                                                .tourId((Long) result[0])
                                                .tourName((String) result[1])
                                                .reservationCount(((Number) result[2]).intValue())
                                                .build())
                                .collect(Collectors.toList());
        }
}