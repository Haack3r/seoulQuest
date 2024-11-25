package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Coupon;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.UserCoupon;
import com.positive.culture.seoulQuest.repository.CouponRepository;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.repository.UserCouponRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Log4j2
@SpringBootTest
public class CouponRepositoryTests {

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private UserCouponRepository userCouponRepository;

    @Autowired
    private MemberRepository memberRepository;

    // 금액 할인 쿠폰(배송비 할인 등)
    @Test
    public void insertDummyAmountCoupon() {

        String[][] coupons = {
                {"Welcome Coupon", "5000"},
                {"Birthday Coupon", "7000"},
                {"Shipping Coupon", "3000"},
                {"Holiday Coupon", "4000"},
                {"VIP Coupon", "10000"},
                {"Anniversary Coupon", "1000"},
//                {"Special Event Coupon", "2000"},
//                {"New Year Coupon", "5000"},
//                {"Christmas Coupon", "6000"},
//                {"Black Friday Coupon", "8000"},
//                {"First Purchase Coupon", "5000"},
//                {"Clearance Sale Coupon", "1500"},
//                {"Weekend Special Coupon", "4000"},
//                {"Limited Time Offer Coupon", "2500"},
//                {"Autumn Sale Coupon", "3000"},
//                {"Winter Sale Coupon", "5500"},
//                {"End of Season Coupon", "6000"},
//                {"Clearance Coupon", "4000"},
//                {"Buy More Save More Coupon", "2000"},
//                {"Bulk Purchase Coupon", "10000"},
//                {"Exclusive Member Coupon", "7000"},
//                {"Holiday Bonus Coupon", "3000"},
//                {"Last Minute Deal Coupon", "2500"}
        };

        for (int i = 0; i < coupons.length; i++) {
            // Coupon 객체를 생성하고 빌더 패턴을 사용하여 필요한 데이터를 설정합니다.
            Coupon coupon = Coupon.builder()
                    .couponName(coupons[i][0]) // 쿠폰 이름 설정
                    .couponCode("seoulQuest" + (int) (Math.random() * 12345)) // 랜덤 쿠폰 코드 생성
                    .discount(Integer.parseInt(coupons[i][1])) // 할인 금액을 정수로 변환하여 설정
                    .expireDate(LocalDate.of(2024, 11,  30))
                    .isActive(Math.random() < 0.5) // 50% 확률로 true 또는 false 설정
                    .build();

            // 생성한 쿠폰을 저장소에 저장
            couponRepository.save(coupon);
        }
    }

    //각 user가 가지고 있는 쿠폰 데이터 넣기
    @Test
    @Transactional
    @Rollback(false)
    public void insertUserCouponsWithActiveCoupons() {
        // 1. 모든 멤버와 활성화된 쿠폰 데이터 가져오기
        List<Member> members = memberRepository.findAll();
        List<Coupon> activeCoupons = couponRepository.findAll().stream()
                .filter(Coupon::isActive) // isActive가 true인 쿠폰만 필터링
                .collect(Collectors.toList());

        if (members.isEmpty() || activeCoupons.isEmpty()) {
            System.out.println("Required data (members or active coupons) is missing.");
            return;
        }

        // 2. 멤버별로 UserCoupon 생성
        members.forEach(member -> {
            // 각 멤버에게 2~3개의 쿠폰을 랜덤으로 할당
            int couponCount = 2 + (int) (Math.random() * 2); // 2~3개의 쿠폰 할당
            Set<Long> assignedCoupons = new HashSet<>(); // 중복 방지용 Set

            for (int i = 0; i < couponCount; i++) {
                Coupon coupon;
                do {
                    coupon = activeCoupons.get((int) (Math.random() * activeCoupons.size())); // 랜덤 쿠폰 선택
                } while (assignedCoupons.contains(coupon.getCouponId())); // 이미 할당된 쿠폰이면 다시 선택

                assignedCoupons.add(coupon.getCouponId()); // 쿠폰 ID 저장

                // UserCoupon 생성
                UserCoupon userCoupon = UserCoupon.builder()
                        .coupon(coupon)
                        .couponOwner(member)
                        .useDate(null) // 초기에는 사용되지 않은 상태로 설정
                        .build();

                // UserCoupon 저장
                userCouponRepository.save(userCoupon);

                System.out.println("Saved UserCoupon: Member=" + member.getEmail() + ", Coupon=" + coupon.getCouponName());
            }
        });
    }

    //랜덤으로 유저에게 쿠폰넣기
    @Test
    @Transactional
    @Rollback(false) // 자동 롤백 방지
    public void insertCouponUser() {
        String[] emails = {"user1@gmail.com", "user2@gmail.com", "user3@gmail.com",
                "user4@gmail.com", "user5@gmail.com", "user6@gmail.com", "user7@gmail.com"};

        for (String email : emails) {
            Coupon randomCoupon = couponRepository.getReferenceById((long) (Math.random() * 23) + 1);

            if (randomCoupon.isActive()) {
                UserCoupon userCoupon = UserCoupon.builder()
                        .coupon(randomCoupon)
                        .couponOwner(memberRepository.findByEmail(email).orElseThrow())
                        //.useDate(LocalDate.parse("2024-11-0"+(i+1))) //사용날짜가 있는경우
                        .build();
                userCouponRepository.save(userCoupon);
                System.out.println("Saved UserCoupon for email: " + email + " with Coupon ID: " + randomCoupon.getCouponId());
            } else {
                System.out.println("Coupon ID " + randomCoupon.getCouponId() + " is not active.");
            }
        }
    }


    @Test
    public void findCouponByEmailTest(){
        String email = "user1@gmail.com";
        List<UserCoupon> userCoupon = userCouponRepository.findByCouponOwnerEmail(email);
        log.info(userCoupon);
    }

    @Test//테스트 통과
    public void findfirstCouponTest(){
        String email = "user1@gmail.com";
        String couponName = "Last Minute Deal Coupon";
        UserCoupon userCoupon = userCouponRepository.findFirstByCouponOwnerEmailAndCouponCouponNameAndUseDateIsNull(email,couponName);

        log.info(userCoupon.getUserCouponId());
    }



}
