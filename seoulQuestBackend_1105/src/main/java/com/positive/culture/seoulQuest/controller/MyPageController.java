package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Address;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.dto.MemberDTO;
import com.positive.culture.seoulQuest.dto.ReservationItemListDTO;
import com.positive.culture.seoulQuest.dto.UserDTO;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Log4j2
@CrossOrigin("*")
@RequestMapping("/api/mypage")
public class MyPageController {
    private final PasswordEncoder passwordEncoder;
    final MemberService memberService;
    final MemberRepository memberRepository;

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @PostMapping("/editProfile")
    public ResponseEntity<String> getInfoForMyPage(@RequestBody UserDTO dto){
        System.out.println("dto:"+dto);
        String email = dto.getEmail();
        Member member = memberService.findByEmail(email).orElseThrow();
        System.out.println("member: " + member);
        memberRepository.save(member);
        return new ResponseEntity<>("Profile edit complete", HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/info")
    public UserDTO getInfo(Principal principal){
        System.out.println("principal:"+principal);
        String email = principal.getName();
        Member member = memberService.findByEmail(email).orElseThrow();
        System.out.println("member: " + member);
        UserDTO userDTO = memberService.entityToUserDTOforMypage(member);
        System.out.println(userDTO);

        return userDTO;
    }



}
