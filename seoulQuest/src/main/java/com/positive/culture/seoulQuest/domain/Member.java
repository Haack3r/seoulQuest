package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter

public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String nickName;
    private String password;
    private String phoneNumber;
    private String address;

    @Embedded
    private Address address;

    @Embeddable
    @AllArgsConstructor
    @NoArgsConstructor
    private static class Address {
        private String street;
        private String city;
        private String state;
        private String zipCode;
    }

}
