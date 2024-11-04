package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.dto.MemberDTO;
import com.positive.culture.seoulQuest.dto.ReservationItemListDTO;
import com.positive.culture.seoulQuest.dto.UserDTO;
import com.positive.culture.seoulQuest.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Log4j2
@CrossOrigin("*")
public class MyPageController {

    final MemberService memberService;


//    @PreAuthorize("hasAnyRole('ROLE_USER')")
//    @GetMapping("/api/mypage/info")
//    public MemberDTO getInfoForMyPage(UserDTO dto){
//        System.out.println("dto:"+dto);
//        String email = dto.getEmail();
//        Member member = memberService.findByEmail(email).orElseThrow();
//        MemberDTO memberDTO = memberService.entityToDTO(member);
//        System.out.println("memberdto: " + memberDTO);
//        return memberDTO;
//    }


    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/api/mypage/info")
    public MemberDTO getInfoForMyPage(Principal principal){
        System.out.println("principal:"+principal);
        String email = principal.getName();
        Member member = memberService.findByEmail(email).orElseThrow();
        MemberDTO memberDTO = memberService.entityToDTO(member);
        System.out.println("memberdto: " + memberDTO);
        return memberDTO;
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/api/mypage/editProfile")
    public UserDTO getInfo(Principal principal){
        System.out.println("principal:"+principal);
        String email = principal.getName();
        Member member = memberService.findByEmail(email).orElseThrow();
        System.out.println("member: " + member);
        UserDTO userDTO = UserDTO.builder()
                .email(member.getEmail())
                .password(member.getPassword())
                .nickName(member.getNickName())
                .fullname(member.getName())
                .phoneNumber1(member.getPhoneNumber().substring(0,3))
                .phoneNumber2(member.getPhoneNumber().substring(4,8))
                .phoneNumber3(member.getPhoneNumber().substring(9))
                .birthday(member.getBirthday())
                .country(member.getAddress().getCountry())
                .state(member.getAddress().getState())
                .city(member.getAddress().getCity())
                .street(member.getAddress().getStreet())
                .zipcode(member.getAddress().getZipCode())
                .build();
        System.out.println(userDTO);

        return userDTO;
    }



}
