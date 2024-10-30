package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Table(name = "tbl_member")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;
    private String email;
    private String nickName;
    private String password;
    private boolean social;
    private String phoneNumber;
    private LocalDate birthday;

    @Embedded
    private Address address;

    @ElementCollection
    @Builder.Default
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

    public void changeSocial(boolean social) {this.social = social;}

    public void changePhone(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void changeAddress(Address address) {
        this.address = address;
    }

    public void changeBirth(LocalDate birthday) { this.birthday = birthday; }


}
