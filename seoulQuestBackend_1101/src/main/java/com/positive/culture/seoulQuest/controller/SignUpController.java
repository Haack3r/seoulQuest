package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.dto.MemberDTO;
import com.positive.culture.seoulQuest.dto.UserDTO;
import com.positive.culture.seoulQuest.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
//@CrossOrigin("")
@Log4j2
@PreAuthorize("permitAll()")
@CrossOrigin("*")
public class SignUpController {

    final MemberService memberService;

    @PostMapping("/api/member/check")
    public ResponseEntity<String> showSignUpCheck(@RequestBody UserDTO dto) {
        System.out.println("회원 등록 check controller : " +dto);
        Optional<Member> member = memberService.findByEmail(dto.getEmail());

        if (member.isPresent()) {
            // 会員が存在する場合
            String e = member.get().getEmail(); // メールアドレスを取得
            System.out.println(e);
            return new ResponseEntity<>("이미 회원이 존재하므로 가입불가", HttpStatus.OK);
        } else {
            // 会員が存在しない場合
            return new ResponseEntity<>("회원가입가능", HttpStatus.OK);
        }

    }
    @PostMapping("/api/member/checknickname")
    public ResponseEntity<String> showNicknameCheck(@RequestBody UserDTO dto) {
        System.out.println("닉네임 check controller : " +dto);
        Optional<Member> member = memberService.findByNickname(dto.getNickName());

        if (member.isPresent()) {
            // 会員が存在する場合
            String e = member.get().getNickName(); // メールアドレスを取得
            System.out.println(e);
            return new ResponseEntity<>("This nickname is already taken", HttpStatus.OK);
        } else {
            // 会員が存在しない場合
            return new ResponseEntity<>("This nickname is available", HttpStatus.OK);
        }

    }

    @PostMapping("/api/member/signup")
    public ResponseEntity<String> showSignUpForm(@RequestBody UserDTO dto) {
        System.out.println("회원 등록 controller : " + dto);
        Member member = memberService.save(dto);
        return new ResponseEntity<>("회원등록 완료", HttpStatus.OK);
    }


}
