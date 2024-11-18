package com.positive.culture.seoulQuest.dto;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.Tour;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductReviewDTO {

    private Long prid;

    private Product product;

    private Member member;

    private int rating;

    private String reviewContent;
    private LocalDate postedDate;

}
