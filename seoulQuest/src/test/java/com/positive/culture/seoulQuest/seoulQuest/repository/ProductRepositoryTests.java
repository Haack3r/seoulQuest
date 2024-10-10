package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.util.Optional;
import java.util.UUID;

@SpringBootTest
@Log4j2
public class ProductRepositoryTests {
    @Autowired
    ProductRepository productRepository;

    @Test
    public void testInsert(){
        for(int i= 0; i<10; i++){
            Product product = Product.builder()
                    .pname("상품"+i)
                    .price(100*i)
                    .pdesc("상품설명" + i)
                    .build();
            product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE1.jpg");
            product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE2.jpg");
            productRepository.save(product);
            log.info("----------------------");
        }

    }

    @Test
    public void testRead2(){
        Long pno =1l;
        Optional<Product> result = productRepository.selectOne(pno);

        Product product = result.orElseThrow();

        log.info(product);
        log.info(product.getImageList());
    }

    @Commit
    @Transactional
    @Test
    public void testDelete(){
        Long pno =2l;
        productRepository.updateToDelete(pno,true);
    }

    @Test
    public void testUpdate(){
        Long pno =10l;

        Product product = productRepository.selectOne(pno).get();
        product.changeName("10번상품");
        product.changeDesc("10번상품 설명");
        product.changePrice(5000);

        product.clearList(); //이미지 파일 리스트 비움.

        product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE1.jpg");
        product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE2.jpg");
        product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE3.jpg");

        productRepository.save(product);

    }


}
