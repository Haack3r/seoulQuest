package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.dto.MemberDTO;

import java.util.stream.Collectors;

public interface MemberService {
    MemberDTO getMemberId (Long id);

    default MemberDTO entityDTO (Member member) {
        MemberDTO memberDto = new MemberDTO(
                member.getMemberId(),
                member.getName(),
                member.getEmail(),
                member.getNickName(),
                member.getPassword(),
                member.getPhoneNumber(),
                member.getAddress(),
                member.getMemberRoleList().stream()
                        .map(memberRole -> memberRole.name()).collect(Collectors.toList()));

        return memberDto;
    }
}
