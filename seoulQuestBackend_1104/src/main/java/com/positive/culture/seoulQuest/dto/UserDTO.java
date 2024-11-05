package com.positive.culture.seoulQuest.dto;

import com.positive.culture.seoulQuest.domain.MemberRole;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Getter
@Setter
@ToString
//@NonNull
@Builder
public class UserDTO {
    //---------------------추가 항목-------------------
    private String fullname;
    private String newPassword;
//    -------------------------------------------------

    private String firstname;
    private String lastname;
    private String nickName;
    private String email;
    private String phoneNumber1;
    private String phoneNumber2;
    private String phoneNumber3;
    private LocalDate birthday;
    private String country;
    private String state;
    private String city;
    private String street;
    private String zipcode;
    private String password;
    private String matchingPassword;

    private MemberRole memberRole ;

}


