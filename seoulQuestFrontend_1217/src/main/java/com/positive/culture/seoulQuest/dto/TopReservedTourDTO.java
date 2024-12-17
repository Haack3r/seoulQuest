package com.positive.culture.seoulQuest.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TopReservedTourDTO {
    private Long tourId;
    private String tourName;
    private int reservationCount;
    private Long totalRevenue;
}
