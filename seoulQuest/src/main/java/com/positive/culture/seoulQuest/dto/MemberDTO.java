//package com.positive.culture.seoulQuest.dto;
//
//import com.positive.culture.seoulQuest.domain.Address;
//import lombok.Getter;
//import lombok.Setter;
//import lombok.ToString;
//import org.springframework.boot.autoconfigure.security.SecurityProperties;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Getter
//@Setter
//@ToString
//
//public class MemberDTO extends SecurityProperties.User {
//    private String memberId;
//    private String name;
//    private String email;
//    private String nickName;
//    private String password;
//    private String phoneNumber;
//    private Address address;
//    private LocalDate birthday;
//    private List<String> role = new ArrayList<>();
//
//    public MemberDTO(String memberId, String name, String email,
//                     String nickName, String password, String phoneNumber, Address address, List<String> role
//            , LocalDate birthday) {
//        super(
//                email,
//                password,
//                role.stream().map(roleStr -> new SimpleGrantedAuthority("ROLE_" + roleStr))
//                        .collect(Collectors.toList()));
//        this.memberId = memberId;
//        this.name = name;
//        this.email = email;
//        this.nickName = nickName;
//        this.password = password;
//        this.phoneNumber = phoneNumber;
//        this.address = address;
//        this.role = role;
//    }
//}
