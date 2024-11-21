package com.positive.culture.seoulQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentItemDTO { //리뷰할 paymentItem정보 보낼때 사용

    private Long paymentItemId;
    private Long pno;
    private String pname;

}
