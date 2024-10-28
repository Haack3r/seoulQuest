package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.domain.TourDate;
import com.positive.culture.seoulQuest.formatter.LocalDateFormatter;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.repository.TourDateRepository;
import com.positive.culture.seoulQuest.repository.TourRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class TourRepositoryTests {
    @Autowired
    TourRepository tourRepository;

    @Autowired
    TourDateRepository tourDateRepository;

    @Autowired
    CategoryRepository categoryRepository;

    // 4. tour data 저장
    @Test
    public void testInsert(){
        String[] tourDescriptions = {
                "Explore the hidden gems of the city with our expert guide, discovering unique spots known only to locals.",
                "Embark on an adventure through lush jungles, experiencing the rich wildlife and breathtaking natural scenery.",
                "Immerse yourself in the history of the region with our cultural heritage tour, featuring visits to ancient temples and landmarks.",
                "Take a scenic hike up the mountains, with panoramic views waiting for you at the summit. Perfect for nature enthusiasts!",
                "Join us for a wine and dine experience, visiting local vineyards and sampling the best regional wines paired with gourmet meals.",
                "Cruise along the crystal-clear waters on our luxury boat tour, complete with refreshments and a knowledgeable guide.",
                "Experience the vibrant city nightlife, visiting popular spots and enjoying live music and delicious street food.",
                "Step back in time with our historical tour, featuring well-preserved castles, forts, and stories of the past brought to life.",
                "Relax on our sunset beach tour, perfect for capturing beautiful moments with loved ones as the sun dips below the horizon.",
                "Discover local culinary delights with our food walking tour, tasting the authentic dishes that define the culture of the area.",
                "Get your adrenaline pumping with our white-water rafting adventure, perfect for thrill-seekers looking to challenge the rapids.",
                "Embark on a family-friendly tour of the countryside, with activities suitable for all ages and plenty of beautiful photo opportunities.",
                "Visit scenic waterfalls on our eco-friendly tour, focusing on nature conservation and learning about the local ecosystem.",
                "Explore the bustling local markets, learning about traditional crafts and enjoying a hands-on experience with local artisans.",
                "Take part in our spiritual retreat tour, visiting serene temples and meditation spots designed to help you unwind and reflect."
        };

        for(int i= 0; i<tourDescriptions.length; i++){
            Tour tour = Tour.builder()
                    .tname("투어"+(i+1))
                    .tdesc(tourDescriptions[i])
                    .tprice(100*(i+1))
                    .max_capacity(2*(i+1))
                    .tlocation("투어장소"+(i+1))
                    .category(categoryRepository.getReferenceById(20l))
                    .build();
            tour.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE1.jpg");
            tour.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE2.jpg");
            tourRepository.save(tour);
            log.info("----------------------");
        }
    }

    // 5. 예약 날짜 데이터 추가
    @Test
    public void testInsertTdate(){
        for(int i = 10; i<19 ; i++){
            TourDate tourDate = TourDate.builder()
                    .available_capacity((int)(Math.random()*30)+1)
                    .tour(tourRepository.selectOne(15l).get())
                    .tourDate(LocalDate.parse("2024-10-"+ i, DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                    .build();
            tourDateRepository.save(tourDate);
        }
    }


//    @Test
//    public void testRead2(){
//        Long pno =1l;
//        Optional<Product> result = productRepository.selectOne(pno);
//
//        Product product = result.orElseThrow();
//
//        log.info(product);
//        log.info(product.getImageList());
//    }
//
//    @Commit
//    @Transactional
//    @Test
//    public void testDelete(){
//        Long pno =2l;
//        productRepository.updateToDelete(pno,true);
//    }
//
//    @Test
//    public void testUpdate(){
//        Long pno =10l;
//
//        Product product = productRepository.selectOne(pno).get();
//        product.changeName("10번상품");
//        product.changeDesc("10번상품 설명");
//        product.changePrice(5000);
//
//        product.clearList(); //이미지 파일 리스트 비움.
//
//        product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE1.jpg");
//        product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE2.jpg");
//        product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE3.jpg");
//
//        productRepository.save(product);
//
//    }

//    @Test
//    public void testDate(){
//        String string = "2024-10-14";
//        long num = 1l;
//        LocalDate date = LocalDate.parse(string, DateTimeFormatter.ISO_DATE);
//        System.out.println(date);
//        tourRepository.getTourBytDate(date,num);
//    }

    @Test
    public void testDate(){
        Long num = 1l;
        List<TourDate> tourdate = tourDateRepository.selectDateList(num);
        tourdate.forEach(System.out::println);
    }
}
