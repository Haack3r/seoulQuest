package com.green.jaeyoon.goodmorning.repository;

import com.green.jaeyoon.goodmorning.domain.Member;
import com.green.jaeyoon.goodmorning.domain.MemberRole;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@Log4j2

public class MemberRepositoryTests {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void insertDummies(){
        for (int i = 0; i < 10; i++) {
            Member member = Member.builder()
                    .email("user"+i+"@gmail.com")
                    .pw(passwordEncoder.encode("1111"))
                    .nickname("USER"+i)
                    .build();
            member.addRole(MemberRole.USER);
            if (i>=5) member.addRole(MemberRole.MANAGER);
            if (i>=8) member.addRole(MemberRole.ADMIN);
            memberRepository.save(member);
        }
    }

    @Test
    public void insertDummiesOne(){
            Member member = Member.builder()
                    .email("user"+11+"@gmail.com")
                    .pw(passwordEncoder.encode("1111"))
                    .nickname("USER"+11)
                    .build();
            member.addRole(MemberRole.USER);
//            member.addRole(MemberRole.MANAGER);
//            member.addRole(MemberRole.ADMIN);
            memberRepository.save(member);
    }

    @Test
    public void testRead(){
        String email = "user1@gmail.com";
        Member member = memberRepository.getWithRoles(email);
        log.info("------");
        log.info(member);
    }
    // findAll 로 email 조회 후 email 별 데이터 출력

    @Test
    public void quiz1(){
        List<Member> members = new ArrayList<>();
        memberRepository.findAll().forEach(i -> {
            members.add(memberRepository.getWithRoles(i.getEmail()));
        });
        members.forEach(System.out::println);
    }
}
