package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter

public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String memberId;

    private String name;
    private String email;
    private String nickName;
    private String password;
    private String phoneNumber;

    @Embedded
    private Address address;

    @ElementCollection
    private List<MemberRole> memberRoleList = new ArrayList<>();

    public void addRole(MemberRole memberRole) {
        memberRoleList.add(memberRole);
    }

    public void deleteRole(MemberRole memberRole) {
        memberRoleList.remove(memberRole);
    }

    public void changeEmail(String email) {
        this.email = email;
    }

    public void changeNick(String nickName) {
        this.nickName = nickName;
    }

    public void changePw(String password) {
        this.password = password;
    }

    public void changePhone(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void changeAddress(Address address) {
        this.address = address;
    }

}
