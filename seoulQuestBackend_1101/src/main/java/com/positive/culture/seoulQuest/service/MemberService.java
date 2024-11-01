package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.dto.MemberDTO;
import com.positive.culture.seoulQuest.dto.MemberModifyDTO;
import com.positive.culture.seoulQuest.dto.UserDTO;
import jakarta.transaction.Transactional;

import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
public interface MemberService {
    MemberDTO getKakaoMember(String accessToken);

    void modifyMember(MemberModifyDTO memberModifyDTO);
    Optional<Member> findByEmail(String email);
    Member save(UserDTO dto);

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
}