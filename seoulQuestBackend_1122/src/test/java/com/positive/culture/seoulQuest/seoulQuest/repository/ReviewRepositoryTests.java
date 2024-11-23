package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.ProductPaymentItem;
import com.positive.culture.seoulQuest.domain.ProductReview;
import com.positive.culture.seoulQuest.repository.*;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@SpringBootTest
@Log4j2
public class ReviewRepositoryTests {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProductReviewRepository productReviewRepository;

    @Autowired
    private ProductPaymentItemRepository productPaymentItemRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void insertDiverseProductReviews() {
        // 1. 필요한 데이터 가져오기
        List<Member> members = memberRepository.findAll();
        List<ProductPaymentItem> paymentItems = productPaymentItemRepository.findAll();

        if (members.isEmpty() || paymentItems.isEmpty()) {
            System.out.println("Required data (members or payment items) is missing.");
            return;
        }

        // 2. 배열로 제목과 내용을 정의
        String[] positiveTitles = {
                "Amazing Product!",
                "Worth the Money",
                "Highly Recommended",
                "Exceptional Quality",
                "Love this Product"
        };

        String[] positiveContents = {
                "This product exceeded my expectations. I absolutely loved it!",
                "The quality is amazing, and it was worth every penny.",
                "I am so happy with this purchase. Highly recommend it to others.",
                "This is one of the best products I've ever bought.",
                "Perfect for what I needed. Totally satisfied!"
        };

        String[] negativeTitles = {
                "Very Disappointed",
                "Not Worth the Price",
                "Poor Quality",
                "Regret this Purchase",
                "Terrible Experience"
        };

        String[] negativeContents = {
                "The product did not meet my expectations. I wouldn't buy it again.",
                "Not as described. The quality is very poor.",
                "I regret spending money on this. It was a waste.",
                "The product broke within a week. Terrible quality!",
                "I had a bad experience with this product. Not recommended."
        };

        // 3. 리뷰 데이터 생성
        paymentItems.forEach(paymentItem -> {
            // 연결된 멤버와 상품 가져오기
            Member member = paymentItem.getProductPayment().getPPaymentMember();
            Product product = paymentItem.getProduct();

            // 랜덤으로 좋은 리뷰 또는 나쁜 리뷰 생성
            boolean isPositiveReview = Math.random() < 0.5; // 50% 확률로 좋은 리뷰 또는 나쁜 리뷰 선택
            String title;
            String reviewContent;
            int rating;

            if (isPositiveReview) {
                // 좋은 리뷰
                title = positiveTitles[(int) (Math.random() * positiveTitles.length)];
                reviewContent = positiveContents[(int) (Math.random() * positiveContents.length)];
                rating = 4 + (int) (Math.random() * 2); // 4~5점
            } else {
                // 나쁜 리뷰
                title = negativeTitles[(int) (Math.random() * negativeTitles.length)];
                reviewContent = negativeContents[(int) (Math.random() * negativeContents.length)];
                rating = 1 + (int) (Math.random() * 2); // 1~2점
            }

            // 리뷰 생성
            ProductReview review = ProductReview.builder()
                    .product(product)
                    .productPaymentItem(paymentItem)
                    .member(member)
                    .title(title)
                    .rating(rating)
                    .reviewContent(reviewContent)
                    .postedDate(LocalDate.now())
                    .build();

            // 리뷰 저장
            productReviewRepository.save(review);

            System.out.println("Saved ProductReview: " + review.getTitle() + ", Rating: " + review.getRating());
        });
    }


}
