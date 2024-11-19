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

    //투어 data 19 개 저장
    @Test
    public void testInsertTours() {
        String[][] tourSpots = {
                {"Majestic Gyeongbokgung Palace", "Step into the royal past of Korea at this stunning palace, a masterpiece of traditional Korean architecture.", "161 Sajik-ro, Jongno-gu, Seoul", "Historical & Cultural Sites"},
                {"Enchanting Bukchon Hanok Village", "Discover a charming village filled with traditional hanoks and scenic alleys.", "37 Gyedong-gil, Jongno-gu, Seoul", "Historical & Cultural Sites"},
                {"Vibrant Insadong Cultural Street", "Stroll through a street packed with art galleries, tea houses, and unique shops.", "Insa-dong, Jongno-gu, Seoul", "Shopping & Lifestyle"},
                {"Myeongdong Magic", "Lose yourself in the bustling streets filled with fashion, beauty, and mouth-watering street food.", "Myeongdong, Jung-gu, Seoul", "Shopping & Lifestyle"},
                {"Breathtaking Namsan Seoul Tower", "Ascend to Seoul’s iconic tower for panoramic views and unforgettable moments.", "105 Namsangongwon-gil, Yongsan-gu, Seoul", "Landmarks & Scenic Views"},
                {"Futuristic Dongdaemun Design Plaza", "Marvel at this architectural gem hosting exhibitions, events, and shopping experiences.", "281 Eulji-ro, Jung-gu, Seoul", "Landmarks & Scenic Views"},
                {"Luxury Stroll on Cheongdam Boulevard", "Indulge in the high life with premium shopping and exquisite dining.", "Cheongdam-dong, Gangnam-gu, Seoul", "Shopping & Lifestyle"},
                {"Global Flavors in Itaewon", "Enjoy the vibrant nightlife and savor international cuisines in this multicultural hotspot.", "Itaewon-dong, Yongsan-gu, Seoul", "Shopping & Lifestyle"},
                {"Namdaemun Market Buzz", "Dive into Korea’s largest traditional market for unique finds and delicious eats.", "21 Namdaemunsijang 4-gil, Jung-gu, Seoul", "Shopping & Lifestyle"},
                {"Tranquil Cheonggyecheon Stream", "Relax by this urban stream with scenic walkways and art installations.", "Cheonggyecheon-ro, Jongno-gu, Seoul", "Nature & Outdoor"},
                {"Creative Vibes in Hongdae", "Immerse yourself in a neighborhood teeming with street art, live music, and indie cafes.", "Hongdae, Mapo-gu, Seoul", "Art & Creativity"},
                {"National Museum of Korea Adventure", "Uncover the treasures of Korea's history and culture in this world-class museum.", "137 Seobinggo-ro, Yongsan-gu, Seoul", "Historical & Cultural Sites"},
                {"Seoul Forest Serenity", "Explore lush greenery, riverside views, and even a deer park in this urban oasis.", "273 Ttukseom-ro, Seongdong-gu, Seoul", "Nature & Outdoor"},
                {"Bukhansan Hiking Escape", "Conquer scenic trails and embrace the beauty of Seoul's mountainous national park.", "262 Bogukmun-ro, Seongbuk-gu, Seoul", "Nature & Outdoor"},
                {"Peaceful Jogyesa Temple", "Experience tranquility at this serene Buddhist temple with beautiful gardens.", "55 Ujeongguk-ro, Jongno-gu, Seoul", "Historical & Cultural Sites"},
                {"Olympic Park Legacy", "Walk through history and art at this park created for the 1988 Olympics.", "424 Olympic-ro, Songpa-gu, Seoul", "Nature & Outdoor"},
                {"Vintage Finds at Hwanghak-dong Market", "Hunt for antiques and vintage treasures at this bustling flea market.", "Hwanghak-dong, Jung-gu, Seoul", "Shopping & Lifestyle"},
                {"Artistic Energy at Daehangno", "Soak up the youthful energy of this university district filled with theaters and creativity.", "Daehangno, Jongno-gu, Seoul", "Art & Creativity"},
                {"Presidential Prestige at The Blue House", "Visit the iconic residence of Korea's President with stunning architecture and history.", "1 Cheongwadae-ro, Jongno-gu, Seoul", "Historical & Cultural Sites"},
//      카테고리 삭제 항목,  없어도됨
//                {"Lotus Lantern Festival Delight", "Celebrate Buddha’s birthday with dazzling lantern parades and cultural events.", "Various locations in Seoul", "Festivals & Events"},
//                {"Traditional Korean Pottery Workshop", "Create your own masterpiece in this hands-on pottery experience.", "234-1 Insadong-gil, Jongno-gu, Seoul", "Cultural Experiences"},
//                {"Tea Ceremony Bliss", "Discover the art of Korean tea culture in a tranquil traditional setting.", "45-2 Samcheong-ro, Jongno-gu, Seoul", "Cultural Experiences"},
//                {"Hanbok Experience at Gyeongbokgung", "Feel like royalty as you don a traditional Korean hanbok in a palace setting.", "161 Sajik-ro, Jongno-gu, Seoul", "Cultural Experiences"},
//                {"Korean Calligraphy Class", "Learn the graceful art of Korean calligraphy in this interactive session.", "89-4 Insadong-gil, Jongno-gu, Seoul", "Cultural Experiences"},
//                {"Kimchi-Making Adventure", "Dive into Korea's culinary heritage by making your own delicious kimchi.", "101-3 Itaewon-dong, Yongsan-gu, Seoul", "Cultural Experiences"}
        };


        for (int i = 0; i < tourSpots.length; i++) {
            String tname = tourSpots[i][0];
            String tdesc = tourSpots[i][1];
            String taddress = tourSpots[i][2];
            String categoryName = tourSpots[i][3];

            // Retrieve the category by name
            Category category = categoryRepository.findByCategoryName(categoryName);
            if (category == null) {
                log.warn("Category not found for name: " + categoryName);
                continue; // Skip if category is not found
            }

            Tour tour = Tour.builder()
                    .tname(tname)
                    .tdesc(tdesc)
                    .tprice(1000 + (i * 100))  // Example price
                    .maxCapacity(20)           // Set default max capacity
                    .tlocation("Seoul")        // Default location as "Seoul"
                    .taddress(taddress)
                    .category(category)        // Set retrieved category
                    .build();

            // Adding two sample images for each tour
            tour.addImageString(UUID.randomUUID().toString() + "_" + "IMAGE1.jpg");
            tour.addImageString(UUID.randomUUID().toString() + "_" + "IMAGE2.jpg");

            tourRepository.save(tour);  // Saving to the database
            log.info("Inserted Tour: " + tour);
        }
    }

    //투어 날짜 저장
    @Test
    public void testInsertMultipleTourDates() {

        for (int tourId = 1; tourId < 20; tourId++) {
            // 오늘 날짜 이후로 10개의 날짜 생성
            for (int dayOffset = 0; dayOffset < 10; dayOffset++) {
                TourDate tourDate = TourDate.builder()
                        .availableCapacity(20)
                        .tour(tourRepository.selectOne((long) tourId).get())
                        .tourDate(LocalDate.now().plusDays(dayOffset)) // 오늘 날짜 기준
                        .build();
                tourDateRepository.save(tourDate);
            }
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

    @Transactional
    @Test
    public void testAddress(){
        List<Tour> list = tourRepository.findByTaddress("161 Sajik-ro, Jongno-gu, Seoul");
        list.forEach(i-> System.out.println(i));
    }
}
