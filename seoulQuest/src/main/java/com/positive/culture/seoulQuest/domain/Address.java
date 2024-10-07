package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter

public class Address {
    private String street;
    private String city;
    private String state;
    private String zipCode;
}
