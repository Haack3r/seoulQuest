package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Address;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.MemberRole;
import com.positive.culture.seoulQuest.dto.MemberDTO;
import com.positive.culture.seoulQuest.dto.MemberModifyDTO;
import com.positive.culture.seoulQuest.dto.UserDTO;
import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
public interface MemberService {

    MemberDTO getKakaoMember(String accessToken);

    void modifyMember(MemberModifyDTO memberModifyDTO);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String email);
    Member save(UserDTO dto);
    void modifyInfo(UserDTO dto);
    Member findPasswordAndSendEmail(String email, String password);

    default MemberDTO entityToDTO(Member member) {
        MemberDTO dto = new MemberDTO(
                member.getEmail(),
                member.getPassword(),
                member.getNickName(),
                member.isSocial(),
                member.getMemberRoleList().stream()
                        .map(memberRole -> memberRole.name()).collect(Collectors.toList()));
        return dto;
    }

    default UserDTO entityToUserDTOforMypage(Member member) {
        UserDTO userDTO = UserDTO.builder()
                .email(member.getEmail())
                .password(member.getPassword())
                .nickName(member.getNickName())
                .firstname(member.getFirstname())
                .lastname(member.getLastname())
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

        return userDTO;
    }

}