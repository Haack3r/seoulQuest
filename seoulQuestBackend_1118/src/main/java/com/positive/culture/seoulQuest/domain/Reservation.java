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
@Table(name="tbl_reservation",
    indexes = {@Index(name = "idx_reservation_email", columnList = "member_owner")})
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rno;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_owner")
    private Member owner;

    private String status;

}
