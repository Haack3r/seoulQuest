package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Coupon;
import com.positive.culture.seoulQuest.domain.DiscountType;
import com.positive.culture.seoulQuest.domain.ProductImage;
import com.positive.culture.seoulQuest.domain.UserCoupon;
import com.positive.culture.seoulQuest.repository.CouponRepository;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.repository.UserCouponRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

@Log4j2
@SpringBootTest
public class CouponRepositoryTests {

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private UserCouponRepository userCouponRepository;

    @Autowired
    private MemberRepository memberRepository;

    //퍼센트 쿠폰
    @Test
    public void insertDummyPercentCoupon(){

        for(int i = 1 ; i<5 ; i++){
            Coupon coupon = Coupon.builder()
                    .couponName("coupon"+i*5)
                    .couponCode("cpercent"+ (int)(Math.random()*12345))
                    .discountType(new DiscountType(i*5,null))
                    .expireDate(LocalDate.parse("2024-11-1"+i))
                    .isActive(true)
                    .build();
        couponRepository.save(coupon);
        }
    }

    //금액 할인 쿠폰(배송비 할인등)
    @Test
    public void insertDummyAmountCoupon(){

        for(int i = 1 ; i<5 ; i++){
            Coupon coupon = Coupon.builder()
                    .couponName("coupon"+i*5)
                    .couponCode("camount"+ (int)(Math.random()*12345))
                    .discountType(new DiscountType(null,1000*i))
                    .expireDate(LocalDate.parse("2024-11-1"+i))
                    .isActive(true)
                    .build();
            couponRepository.save(coupon);
        }
    }

    //쿠폰을 가지고 있는 유저 test
    @Test
    public void insertCouponUser(){
        String[] emails = {"user1@gmail.com", "user2@gmail.com" , "user3@gmail.com" , "user4@gmail.com" , "user5@gmail.com" ,
                "user6@gmail.com" , "user7@gmail.com" , "user8@gmail.com" };


        for(int i =1 ; i<8; i++){
            UserCoupon userCoupon = UserCoupon.builder()
                    .coupon(couponRepository.getReferenceById((long)i+1))
                    .couponOwner(memberRepository.findByEmail(emails[i]).orElseThrow())
//                    .useDate(LocalDate.parse("2024-11-0"+(i+1)))
                    .build();
            userCouponRepository.save(userCoupon);
        }
    }

    @Test
    public void findCouponByEmailTest(){
        String email = "user2@gmail.com";
        List<UserCoupon> userCoupon = userCouponRepository.findByCouponOwnerEmail(email);
        log.info(userCoupon);
    }

}
