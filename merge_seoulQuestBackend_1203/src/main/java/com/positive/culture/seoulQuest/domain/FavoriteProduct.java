package com.positive.culture.seoulQuest.domain;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "tbl_favorite_product")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many-to-One relationship to Member entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // Many-to-One relationship to Product entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // Timestamp for when the favorite was added
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // Constructor to set createdAt timestamp automatically
    public FavoriteProduct(Member member, Product product) {
        this.member = member;
        this.product = product;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    public void onPrePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
