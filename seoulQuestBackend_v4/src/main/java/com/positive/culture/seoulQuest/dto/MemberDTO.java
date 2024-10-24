package com.positive.culture.seoulQuest.dto;//package com.positive.culture.seoulQuest.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString

public class MemberDTO extends User {
    private String email;
    private String password;
    private String nickname;
    private boolean social;
    private List<String> roleNames;

    public MemberDTO(String email, String password, String nickname, boolean social, List<String> roleNames) {
        super(
                email,
                password,
                roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_" + str))
                        .collect(Collectors.toList()));
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.social = social;
        this.roleNames = roleNames;
    }

    public Map<String, Object> getClaims() {
        Map<String, Object> claims = new HashMap<>();

        claims.put("email", email);
        claims.put("password", password);
        claims.put("nickname", nickname);
        claims.put("social", social);
        claims.put("roleNames", roleNames);
        return claims;
    }
}