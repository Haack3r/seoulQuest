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
    public void testInsertTours() {
        String[][] tourSpots = {
                {"Gyeongbokgung Palace", "A beautiful palace representing Korean architecture and heritage.", "161 Sajik-ro, Jongno-gu, Seoul", "Palaces & Historical Sites"},
                {"Bukchon Hanok Village", "Traditional Korean village with stunning views and historic charm.", "37 Gyedong-gil, Jongno-gu, Seoul", "Traditional Villages"},
                {"Insadong Street", "Famous cultural street with unique art shops, tea houses, and galleries.", "Insa-dong, Jongno-gu, Seoul", "Cultural Streets"},
                {"Myeongdong Shopping Street", "Bustling shopping district filled with street food and fashion stores.", "Myeongdong, Jung-gu, Seoul", "Shopping Districts"},
                {"Namsan Seoul Tower", "Iconic tower offering panoramic views of Seoul.", "105 Namsangongwon-gil, Yongsan-gu, Seoul", "Towers & Panoramic Views"},
                {"Dongdaemun Design Plaza", "Modern architectural masterpiece with exhibitions and design shops.", "281 Eulji-ro, Jung-gu, Seoul", "Modern Architecture"},
                {"Cheongdam Luxury Street", "Luxury shopping and dining destination with high-end brands.", "Cheongdam-dong, Gangnam-gu, Seoul", "Luxury Experiences"},
                {"Itaewon", "Vibrant multicultural area with a variety of cuisines and nightlife.", "Itaewon-dong, Yongsan-gu, Seoul", "Multicultural Areas"},
                {"Namdaemun Market", "One of Korea’s largest traditional markets, bustling with vendors and food.", "21 Namdaemunsijang 4-gil, Jung-gu, Seoul", "Street Markets"},
                {"Cheonggyecheon Stream", "Beautiful stream running through the city with scenic walkways.", "Cheonggyecheon-ro, Jongno-gu, Seoul", "Rivers & Streams"},
                {"Hongdae Street Art", "Creative neighborhood known for street art, live performances, and cafes.", "Hongdae, Mapo-gu, Seoul", "Art & Creativity"},
                {"National Museum of Korea", "Explore Korea's history and art through impressive exhibits.", "137 Seobinggo-ro, Yongsan-gu, Seoul", "Museums & Galleries"},
                {"Seoul Forest", "Popular urban park with walking trails, deer park, and riverside views.", "273 Ttukseom-ro, Seongdong-gu, Seoul", "Parks & Nature Trails"},
                {"Bukhansan National Park", "Mountainous national park with scenic hiking trails.", "262 Bogukmun-ro, Seongbuk-gu, Seoul", "Mountains & Hiking"},
                {"Jogyesa Temple", "Prominent Buddhist temple with serene gardens and ceremonies.", "55 Ujeongguk-ro, Jongno-gu, Seoul", "Temples & Spiritual Sites"},
                {"Olympic Park", "Park created for the 1988 Seoul Olympics with art installations and walking paths.", "424 Olympic-ro, Songpa-gu, Seoul", "Olympic Sites"},
                {"Hwanghak-dong Flea Market", "Antique and flea market filled with vintage finds.", "Hwanghak-dong, Jung-gu, Seoul", "Antique & Vintage Markets"},
                {"Daehangno", "Lively area with theaters and a youthful atmosphere, popular with students.", "Daehangno, Jongno-gu, Seoul", "University Districts"},
                {"Blue House", "The executive office and residence of the President of South Korea.", "1 Cheongwadae-ro, Jongno-gu, Seoul", "Presidential & Government Sites"},
                {"Lotus Lantern Festival", "Vibrant festival celebrating Buddha's birthday with lanterns and parades.", "Various locations", "Seasonal Festivals"}
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

    // 5. 예약 날짜 데이터 추가
    @Test
    public void testInsertTdate(){
        for(int i = 10; i<19 ; i++){
            TourDate tourDate = TourDate.builder()
                    .available_capacity((int)(Math.random()*30)+1)
                    .tour(tourRepository.selectOne((long)i).get())
                    .tourDate(LocalDate.parse("2024-11-"+ i, DateTimeFormatter.ofPattern("yyyy-MM-dd")))
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

    @Transactional
    @Test
    public void testAddress(){
        List<Tour> list = tourRepository.findByTaddress("161 Sajik-ro, Jongno-gu, Seoul");
        list.forEach(i-> System.out.println(i));
    }

    @Test
    public void testTourOne(){
        String categoryName = "Seasonal Festivals";

        Category category = categoryRepository.findByCategoryName(categoryName);

        if(category != null) {
            log.info("Found Category: " + category);
        } else {
            log.info("Category not found for name: " + categoryName);
        }
    }


}
