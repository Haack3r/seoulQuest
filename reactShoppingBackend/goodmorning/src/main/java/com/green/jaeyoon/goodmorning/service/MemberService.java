package com.green.jaeyoon.goodmorning.service;

import com.green.jaeyoon.goodmorning.domain.Member;
import com.green.jaeyoon.goodmorning.dto.MemberDTO;
import com.green.jaeyoon.goodmorning.dto.MemberModifyDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;


@Transactional
public interface MemberService {
    MemberDTO getKakaoMember(String accessToken);
    void modifyMember(MemberModifyDTO memberModifyDTO);

    default MemberDTO entityToDTO(Member member) {
        MemberDTO dto = new MemberDTO(
                member.getEmail(),
                member.getPw(),
                member.getNickname(),
                member.isSocial(),
                member.getMemberRoleList().stream()
                        .map(memberRole -> memberRole.name()).collect(Collectors.toList()));
        return dto;
    }
}
