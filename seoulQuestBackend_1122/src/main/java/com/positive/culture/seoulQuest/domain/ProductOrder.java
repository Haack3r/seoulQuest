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
@Table(name = "tbl_product_order")
public class ProductOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pOrderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member pOrderMember;

    private int totalPrice;

    @Builder.Default
    private String paymentStatus = "pending";

    @CreationTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime orderDate;

    // 실제 배송 정보 , 기존 회원 정보와는 다를 수 있음.
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

    //    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_coupon_id")
//    private UserCoupon usedCoupon;

//    public void removedUsedCoupon(){
//        this.usedCoupon = null;
//    }

}
