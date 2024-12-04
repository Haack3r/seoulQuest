package com.positive.culture.seoulQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewDTO { //사용자가 작성한 리뷰내용을 받아오는 dto

    private Long prid;
    private Long trid;
    private Long selectedItemId; //paymentItemId 중 사용자가 리뷰하기로 선택한 Id

    private String email;
    private String nickName;

    private int rating;

    private String title;
    private String reviewContent;
    private LocalDate dueDate;
    private String itemName;

}
