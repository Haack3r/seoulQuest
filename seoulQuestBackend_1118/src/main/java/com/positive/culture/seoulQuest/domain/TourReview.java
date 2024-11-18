package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tbl_tour_review")
public class TourReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trid;

    //특정 tour의 tourDate별 review가 아닌 tour별 review로만 구현할 예정.
    @ManyToOne(fetch = FetchType.LAZY )
    @JoinColumn(name = "tno")
    private Tour tour;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private int rating;

    @Lob // 긴 텍스트 처리를 위해 @Lob 추가
    private String reviewContent;
    private LocalDate postedDate;

    @PrePersist
    public void prePersist() {
        this.postedDate = LocalDate.now();
    }
}

