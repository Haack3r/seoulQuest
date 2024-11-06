package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Address;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.dto.MemberDTO;
import com.positive.culture.seoulQuest.dto.ReservationItemListDTO;
import com.positive.culture.seoulQuest.dto.TourDTO;
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

    private final MemberService memberService;

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @PostMapping("/editprofile")
    public ResponseEntity<String> getInfoForMyPage(@RequestBody UserDTO dto){
        System.out.println("dto:"+dto);
        memberService.modifyInfo(dto);
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

//    서비스에서 email과 phone으로 member찾기 구현 후
//        email 에 6자리 비밀번호 보내주고
//        암호화된 비밀번호는 update문을 통해 db에 임시 비밀번호를 넣어준다 .
    @PreAuthorize("permitAll()")
    @PostMapping("/findpassword")
    public ResponseEntity<UserDTO> findPassword(@RequestBody UserDTO dto) {
        System.out.println(dto);
        String email = dto.getEmail();
        String phoneNumber = String.join("-",
                dto.getPhoneNumber1(),
                dto.getPhoneNumber2(),
                dto.getPhoneNumber3()
        );
        Member member = memberService.findPasswordAndSendEmail(email, phoneNumber);
        UserDTO newUserDTO = memberService.entityToUserDTOforMypage(member);
        return new ResponseEntity<>(newUserDTO, HttpStatus.OK);
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/findemail")
    public ResponseEntity<UserDTO> findEmail(@RequestBody UserDTO dto) {
        System.out.println(dto);
        String firstname= dto.getFirstname();
        String lastname = dto.getLastname();

        String phoneNumber = String.join("-",
                dto.getPhoneNumber1(),
                dto.getPhoneNumber2(),
                dto.getPhoneNumber3()
        );
        Member member = memberService.findEmail(firstname,lastname, phoneNumber);
        UserDTO newUserDTO = memberService.entityToUserDTOforMypage(member);
        return new ResponseEntity<>(newUserDTO, HttpStatus.OK);
    }
}
