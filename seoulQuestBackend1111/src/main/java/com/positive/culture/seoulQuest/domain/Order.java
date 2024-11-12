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

    //결제 실패시에도 쿠폰을 재사용할수 있도록 관계를 ManyToOne으로 지정하여 중복이 가능하게함
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_coupon_id")
    private UserCoupon usedCoupon;

    private int totalPrice;

    @Builder.Default
    private String paymentStatus = "pending";

    //삭제 고려
//    private String paymentMethod;

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

    public void changePaymentStatus(String paymentStatus){
        this.paymentStatus = paymentStatus;
    }

}
