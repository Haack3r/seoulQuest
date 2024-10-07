package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public class MemberRepository extends JpaRepository<Member,Long> {
    public Member member;
}
