package com.green.jaeyoon.goodmorning.repository;

import ch.qos.logback.core.util.OptionHelper;
import com.green.jaeyoon.goodmorning.domain.Product;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@SpringBootTest
@Log4j2
public class ProductRepositoryTests {

    @Autowired
    ProductRepository productRepository;

    @Test
    public void tableData() {
        Map<String, Integer> productMap = new HashMap<>();
        productMap.put("가방", 500);
        productMap.put("가구", 300);
        productMap.put("냉장고", 500);
        productMap.put("TV", 70);
        productMap.put("컴퓨터", 1500);
        productMap.put("오디오", 70);

        List<String> keyList = new ArrayList<>();
        for(String key : productMap.keySet()) keyList.add(key);

        for(int i = 0; i < 100; i++) {
            int rndidx = (int) (Math.random() * keyList.size());
            String rndKey = keyList.get(rndidx);

            Product product = Product.builder()
                    .pname(rndKey)
                    .price(productMap.get(rndKey))
                    .pdesc("상품설명" + i)
                    .build();

            int rnd = (int)(Math.random() * 4);
            if(rnd == 0) rnd = 1;
            for(int j = 0; j < rnd; j++) {
                product.addImageString(UUID.randomUUID().toString() + "_" + "IMAGE" + j + ".jpg");
            }
            productRepository.save(product);
        }
    }

    @Transactional
    @Test
    public void testRead() {
        Long pno = 1L;
        Optional<Product> result = productRepository.findById(pno);
        Product product = result.orElseThrow();
        log.info(product);
        log.info(product.getImageList());
    }

    @Test
    public void testRead2() {
        Long pno = 1L;
        Optional<Product> result = productRepository.selectOne(pno);
        Product product = result.orElseThrow();
        log.info(product);
        log.info(product.getImageList());
    }

    @Commit         // DB에 완전 적용
    @Transactional  // 원자성(Atomic)
    @Test
    public void testDelete() {
        Long pno = 1L;
        productRepository.updateToDelete(pno, true);
        // 실제 삭제 대신 특정 칼럼의 값을 기준으로 해당 상품 삭제 여부를 구분
        // delete 대신 update를 이용하여 처리
    }

    //p208, 상품의 수정
    @Test
    public void testUpdate() {
        Long pno = 2L;
        Product product = productRepository.selectOne(pno).get();
        product.chageName("2번 상품 수정");
        product.changeDesc("상품 설명 수정");
        product.changePrice(5000);

        // 첨부파일 수정
        product.clearList();

        product.addImageString(UUID.randomUUID().toString() + "_" + "NEWIMAGE1.jpg");
        product.addImageString(UUID.randomUUID().toString() + "_" + "NEWIMAGE2.jpg");
        product.addImageString(UUID.randomUUID().toString() + "_" + "NEWIMAGE3.jpg");

        productRepository.save(product);
    }

    //p211
    @Test
    public void testList() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("pno").descending());
        Page<Object[]> result = productRepository.selectList(pageable);
        result.getContent().forEach(arr -> log.info(Arrays.toString(arr)));
    }
}
