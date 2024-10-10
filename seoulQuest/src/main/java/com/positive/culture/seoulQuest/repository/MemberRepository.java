package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member,Long> {
}
