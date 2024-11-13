package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_favorite_tour")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteTour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public FavoriteTour(Member member, Tour tour){
        this.member = member;
        this.tour = tour;
        this.createdAt = LocalDateTime.now();
    }
    @PrePersist
    public void onPrePersist() { this.createdAt = LocalDateTime.now(); }
}
