package com.positive.culture.seoulQuest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.positive.culture.seoulQuest.dto.DashboardStatisticsDTO;
import com.positive.culture.seoulQuest.dto.TopSellingProductDTO;
import com.positive.culture.seoulQuest.dto.TopReservedTourDTO;
import com.positive.culture.seoulQuest.service.AdminDashboardService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {
    private final AdminDashboardService adminDashboard;

    @GetMapping("/statistics")
    public ResponseEntity<DashboardStatisticsDTO> getDashboardStatistics() {
        DashboardStatisticsDTO statistics = adminDashboard.getDashboardStatistics();
        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/top-products")
    public ResponseEntity<List<TopSellingProductDTO>> getTopSellingProducts() {
        List<TopSellingProductDTO> topProducts = adminDashboard.getTopSellingProducts();
        return ResponseEntity.ok(topProducts);
    }

    @GetMapping("/top-tours")
    public ResponseEntity<List<TopReservedTourDTO>> getTopReservedTours() {
        List<TopReservedTourDTO> topTours = adminDashboard.getTopReservedTours();
        return ResponseEntity.ok(topTours);
    }
}
