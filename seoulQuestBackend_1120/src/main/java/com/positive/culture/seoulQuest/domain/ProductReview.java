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
@Table(name = "tbl_product_review")
public class ProductReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long prid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pno")
    private Product product;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_item_id")
    private ProductPaymentItem productPaymentItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;

    private int rating;

    @Lob // 긴 텍스트 처리를 위해 @Lob 추가
    private String reviewContent;
    private LocalDate postedDate;

    @PrePersist
    public void prePersist() {
        this.postedDate = LocalDate.now();
    }
}

