package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.dto.UserDTO;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    @EntityGraph(attributePaths = { "memberRoleList" })
    @Query("select m from Member m where m.email = :email")
    Member getWithRoles(@Param("email") String email);

    Optional<Member> findByEmail(String email); // Test용

    Optional<Member> findByNickName(String nickName); // Test용

    Member save(UserDTO dto);

    Optional<Member> findByEmailAndPhoneNumber(String email, String phoneNumeber);

    Optional<Member> findByFirstnameAndLastnameAndPhoneNumber(String firstname, String lastname, String phoneNumeber);

}
