package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import javax.swing.plaf.PanelUI;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class ProductRepositoryTests {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    //3. product data 추가
    @Test
    public void testInsert(){
        String[] productDescriptions = {
                "Experience the ultimate comfort with our premium cotton bedding set. Soft, breathable, and perfect for a good night's sleep.",
                "Elevate your home with our modern ceramic vase, crafted to add a touch of elegance to any room decor.",
                "Stay connected with our latest wireless earbuds featuring crystal-clear audio and long-lasting battery life.",
                "Enhance your outdoor adventures with our waterproof hiking boots, designed for both comfort and durability.",
                "Enjoy your favorite music on the go with our portable Bluetooth speaker, delivering high-quality sound wherever you are.",
                "Unleash your creativity with our professional-grade watercolor set, including a variety of colors for all your artistic needs.",
                "Step up your fashion game with our classic leather belt, handmade for durability and style.",
                "Keep your kitchen organized with our stackable storage containers, perfect for keeping food fresh and easy to find.",
                "Embrace sustainable living with our eco-friendly bamboo toothbrush set, designed to minimize plastic waste.",
                "Achieve a flawless complexion with our lightweight foundation, formulated to provide natural coverage throughout the day.",
                "Relax in luxury with our plush bathrobe, made from soft microfiber to keep you warm and comfortable.",
                "Improve your productivity with our ergonomic office chair, designed to provide maximum support and comfort during long working hours.",
                "Take control of your cooking with our non-stick frying pan, ensuring even heat distribution and easy clean-up.",
                "Stay hydrated with our insulated stainless steel water bottle, keeping drinks cold for up to 24 hours.",
                "Protect your phone with our sleek, shockproof case, designed to prevent damage from drops and scratches."
        };

        for(int i= 0; i<productDescriptions.length; i++){
            Product product = Product.builder()
                    .pname("product"+(i+1))
                    .pprice(100*(i+1))
                    .pdesc(productDescriptions[i])
                    .pqty(25*(i+1))
                    .shippingCost(2500)
                    .category(categoryRepository.getReferenceById(5l))
                    .build();
            product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE1.jpg");
            product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE2.jpg");
            productRepository.save(product);
            log.info("----------------------");
        }

    }


//    ----------------------------------------------------------------

    @Test
    public void testRead2(){
        Long pno =1l;
        Optional<Product> result = productRepository.selectOne(pno);

        Product product = result.orElseThrow();

        log.info(product);
        log.info(product.getProductImageList());
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
