package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Builder
@Table(name = "tbl_tour_order")
public class TourOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tOrderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_member_id")
    private Member tOrderMember;

    //결제 실패시에도 쿠폰을 재사용할수 있도록 관계를 ManyToOne으로 지정하여 중복이 가능하게함
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_coupon_id")
    private UserCoupon usedCoupon;

    private int totalPrice;

    @Builder.Default
    private String paymentStatus = "pending";

    @CreationTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime orderDate;

    //실제 예약 정보, 기존 회원 정보와는 다를 수 있음.
    private String firstName;
    private String lastName;

    private String phoneNumber;
    private String country;

    //paymentMethod는 결제 엔티티에 저장함.

    public void changePaymentStatus(String paymentStatus){
        this.paymentStatus = paymentStatus;
    }
}
