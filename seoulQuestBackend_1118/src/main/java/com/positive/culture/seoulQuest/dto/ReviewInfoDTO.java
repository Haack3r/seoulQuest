package com.positive.culture.seoulQuest.dto;

import com.positive.culture.seoulQuest.domain.ProductPayment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewInfoDTO {

    //리뷰 작성화면에 '닉네임'과 '구매 상품 목록 이름 / 구매 투어 이름'을 띄우기 위한 DTO

    private String nickName;

    @Builder.Default
    private List<String> pNameList = new ArrayList<>();

    @Builder.Default
    private List<String> tNameList = new ArrayList<>();
}
