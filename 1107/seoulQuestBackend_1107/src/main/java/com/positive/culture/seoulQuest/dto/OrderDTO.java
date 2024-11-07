package com.positive.culture.seoulQuest.dto;

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

    @Builder.Default
    private List<String> coupons  = new ArrayList<>(); ;

    @Builder.Default
    private List<String> orderItems  = new ArrayList<>(); ;

    private String email;
    private String firstname;
    private String lastname;
    private String city;
    private String country;
    private String state;
    private String street;
    private String zipcode;
    private String phoneNumber;

}
