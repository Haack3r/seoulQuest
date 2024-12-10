package com.positive.culture.seoulQuest.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
@Builder
public class CustomerListDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private String nickName;
    private String email;
    private String phoneNumber;
    private LocalDate birthday;
    private String country;
    private String state;
    private String city;
    private String street;
    private String zipCode;
}
