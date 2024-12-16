package com.positive.culture.seoulQuest.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DashboardStatisticsDTO {
    private Long totalRevenue;
    private Long tourCount;
    private Long productCount;
    private double revenueGrowth;
}
