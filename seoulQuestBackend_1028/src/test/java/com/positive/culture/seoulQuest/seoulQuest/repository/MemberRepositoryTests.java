package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Address;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.MemberRole;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.YearMonth;


@SpringBootTest
@Log4j2

public class MemberRepositoryTests {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testIns() {
        for (int i = 1; i <= 10; i++) {
            String middleNum = String.format("%04d", (int) (Math.random() * 10000));
            String lastNum = String.format("%04d", (int) (Math.random() * 10000));

            int year = 1900 + (int) (Math.random() * 130);
            int month = 1 + (int) (Math.random() * 12);
            // (int) (Math.random() * 13) 입력 시 값이 0 도 가능하기에 1+ 를 추가함

            YearMonth yearMonth = YearMonth.of(year, month);
            int day = 1 + (int) (Math.random() * yearMonth.lengthOfMonth());
            // YearMonth 코드를 쓰면 유동적으로 날짜 계산 가능 ex) 4월 31일 불가, 2024-02-29 까지만 계산

            Member member = Member.builder()
                    .address(new Address("길" + i, "시" + i, "도" + i, "123" + i))
                    .name("사용자" + i)
                    .email("user" + i + "@gmail.com")
                    .nickName("Nerd" + i)
                    .password(passwordEncoder.encode("123")) //passwordEncoder.encode("123")
                    .phoneNumber("010" + "-" + middleNum + "-" + lastNum)
                    .birthday(LocalDate.of(year, month, day))
                    .build();
            member.addRole(MemberRole.USER);

            if(i>=8){
                member.addRole(MemberRole.ADMIN);
            }
            memberRepository.save(member);
        }
    }

    @Test
    public void testRead() {

        String email ="user1@gmail.com";

        Member member = memberRepository.getWithRoles(email);

        log.info("---------------------");
        log.info(member);

    }

//    @Test
//    public void testModify() {
//        Long findId = 1L;
//
//        Optional<Member> asd = memberRepository.findById(findId);
//
//        Member member = asd.orElseThrow();
//        member.changeEmail("123@gmail.com");
//        member.changeNick("유저33");
//        member.changePw("111");
//        member.changePhone("010-1111-1111");
//        member.changeBirth(LocalDate.of(2000,12,25));
//
//        // Address 객체를 생성해서 changeAddress 메서드에 전달
//        Address newAddress = new Address("길33", "시33", "도33", "12333");
//        member.changeAddress(newAddress);
//
//        log.info("\n---------------------\n" + member + "\n---------------------");
//    }
//
//    @Test
//    public void testDel() {
//        memberRepository.deleteAll();
//
//        log.info(memberRepository);
//    }
    // 이 테스트 코드를 썼을 때 primary key 가 1부터 시작 안 하는 경우가 있음
}
