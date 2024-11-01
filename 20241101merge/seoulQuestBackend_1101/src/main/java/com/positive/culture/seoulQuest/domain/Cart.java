package com.positive.culture.seoulQuest.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="tbl_cart",
        indexes= {@Index(name = "idx_cart_email", columnList = "member_owner")})
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cno;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_owner")
    private Member owner;

    private String status; //카트 상태 (pending, active, complete)
}
