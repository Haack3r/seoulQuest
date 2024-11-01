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

    private List<String> roleName = new ArrayList<>();

    public MemberDTO(String email, String password, String nickname, boolean social, List<String> roleName) {
        super(email, password, roleName.stream().map(str -> new
                SimpleGrantedAuthority("ROLE_"+str)).collect(Collectors.toList()));

        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.social = social;
        this.roleName = roleName;
    }

    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("email", email);
        dataMap.put("password", password);
        dataMap.put("nickname", nickname);
        dataMap.put("social", social);
        dataMap.put("roleName", roleName);

        return dataMap;
    }
}
