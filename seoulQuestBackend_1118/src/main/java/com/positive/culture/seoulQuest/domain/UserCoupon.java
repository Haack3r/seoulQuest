package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"coupon", "couponOwner"})
@Builder
@Getter
@Setter
@Table(name = "tbl_user_coupon", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"coupon_id", "member_id"})
})
public class UserCoupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userCouponId;

    @JoinColumn(name = "coupon_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Coupon coupon;

    @JoinColumn(name = "member_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member couponOwner;

    private LocalDate useDate;

//    //추가 1114
//    private boolean isActive;


    public void ChangeUseDate(LocalDate useDate){
        this.useDate = useDate;
    }


}
