package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Getter
@Table(name = "tbl_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Member orderOwner;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_coupon_id")
    private UserCoupon usedCoupon;
    private int totalPrice;

    @Builder.Default
    @Column(name = "payment_status")
    private boolean paymentStatus = false;

    private String paymentMethod;


    @CreationTimestamp
    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime orderDate;

    // 실제 배송 정보
    private String recipientFirstName;
    private String recipientLastName;

    private String contactNumber;
    private String city;
    private String street;
    private String state;
    private String country;
    private String zipcode;

}
