package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.formatter.LocalDateFormatter;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import com.positive.culture.seoulQuest.repository.TourRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@SpringBootTest
@Log4j2
public class TourRepositoryTests {
    @Autowired
    TourRepository tourRepository;

    @Test
    public void testInsert(){
        for(int i= 0; i<100; i++){
            Tour tour = Tour.builder()
                    .tname("투어"+i)
                    .tcategoryName("activity")
                    .tdesc("투어설명"+i)
                    .tprice(100*i)
                    .seatRemain(i)
                    .tlocation("투어장소"+i)
                    .tDate(LocalDate.of(2024,10,14))
                    .build();
            tour.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE1.jpg");
            tour.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE2.jpg");
            tourRepository.save(tour);
            log.info("----------------------");
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

    @Test
    public void testDate(){
        String string = "2024-10-14";
        LocalDate date = LocalDate.parse(string, DateTimeFormatter.ISO_DATE);
        System.out.println(date);
        tourRepository.getTourBytDate(date);
    }
}
