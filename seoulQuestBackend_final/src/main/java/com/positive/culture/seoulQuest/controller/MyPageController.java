package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.ProductPayment;
import com.positive.culture.seoulQuest.dto.OrderPaymentDTO;
import com.positive.culture.seoulQuest.dto.UserDTO;
import com.positive.culture.seoulQuest.service.MemberService;
import com.positive.culture.seoulQuest.service.ProductPaymentService;
import com.positive.culture.seoulQuest.service.TourPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;


@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/mypage")
public class MyPageController {

    private final MemberService memberService;
    private final ProductPaymentService productPaymentService;
    private final TourPaymentService tourPaymentService;

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
    @PostMapping("/findpassword")
    public ResponseEntity<UserDTO> findPassword(@RequestBody UserDTO userDTO) {
        UserDTO newUserDTO = memberService.findPasswordAndSendEmail(userDTO);
        return new ResponseEntity<>(newUserDTO, HttpStatus.OK);
    }

    @PostMapping("/findemail")
    public ResponseEntity<UserDTO> findEmail(@RequestBody UserDTO userDTO) {
        UserDTO newUserDTO = memberService.findEmail(userDTO);
        return new ResponseEntity<>(newUserDTO, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/products/orderPaymentInfo")
    public List<OrderPaymentDTO> getOrderPaymentList(Principal principal){
        String email = principal.getName();
        Member member = memberService.findByEmail(email).orElseThrow();
        System.out.println("member: " + member);
        List<OrderPaymentDTO> orderPaymentDTOs = productPaymentService.getOrderPaymentInfo(member);
        System.out.println(orderPaymentDTOs);
        return orderPaymentDTOs;
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/tours/tourPaymentInfo")
    public List<OrderPaymentDTO> getTourPaymentList(Principal principal){
        String email = principal.getName();
        Member member = memberService.findByEmail(email).orElseThrow();
        System.out.println("member: " + member);
        List<OrderPaymentDTO> tourPaymentDTOs = tourPaymentService.getTourPaymentInfo(member);
        System.out.println(tourPaymentDTOs);
        return tourPaymentDTOs;
    }
}
