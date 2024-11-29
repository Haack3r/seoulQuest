package com.positive.culture.seoulQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderPaymentDTO {
    //mypage에서 내 주문목록을 불러올때 사용(Product, tour)

    //Order 엔티티에서 불러올 정보
    private String country;
    private String state;
    private String city;
    private String street;
    private String zipCode;
    private String fullName;
    private String phoneNumber;

    //Payment 엔티티에서 불러올 정보
    private LocalDateTime paymentDate;
    private String paymentMethod;
    private int totalPrice;
    private String usedCoupon;

    //PaymentItem 엔티티에서 불러올 정보
    @Builder.Default
    private List<OrderPaymentItemDTO> paymentItems = new ArrayList<>();
}
