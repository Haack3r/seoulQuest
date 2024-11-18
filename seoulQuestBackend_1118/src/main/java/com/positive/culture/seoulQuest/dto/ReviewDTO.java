package com.positive.culture.seoulQuest.dto;

import com.positive.culture.seoulQuest.domain.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewDTO {

    private Long reviewId;

//    private ProductPayment productPayment;

//    private TourPayment tourPayment;

    private Member member;

    private int rating;

    private String reviewContent;
    private LocalDate postedDate;

}
