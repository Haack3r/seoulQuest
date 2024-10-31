package com.positive.culture.seoulQuest.dto;

import com.positive.culture.seoulQuest.domain.MemberRole;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Getter
@Setter
@ToString
//@NonNull
public class UserDTO {
//    private String firstName;
//    private String lastName;
    private String name;
    private String password;
    private String matchingPassword;
    private String email;
    private MemberRole memberRole ;

}


