package com.positive.culture.seoulQuest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.positive.culture.seoulQuest.domain.Reservation;
import com.positive.culture.seoulQuest.domain.UserCoupon;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

    private Long orderId;

    @Builder.Default
    private List<CouponDTO> coupons  = new ArrayList<>();

    private String usedCoupon;

    @Builder.Default
    private List<CartItemListDTO> porderItems  = new ArrayList<>();

    @Builder.Default
    private List<ReservationItemListDTO> torderItems  = new ArrayList<>();

    private String email;
    private String firstname;
    private String lastname;
    private String city;
    private String country;
    private String state;
    private String street;
    private String zipcode;
    private String phoneNumber;
    private int totalPrice;

    //삭제고려, paymentResponse에 저장되어 있음
//    private String paymentMethod;
}
