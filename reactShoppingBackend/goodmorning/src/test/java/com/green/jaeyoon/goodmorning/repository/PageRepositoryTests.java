package com.green.jaeyoon.goodmorning.repository;

import com.green.jaeyoon.goodmorning.domain.Todo;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@SpringBootTest
@Log4j2
public class PageRepositoryTests {

    @Autowired
    private TodoRepository repository;

    @Test
    public void testPaging() {
        int amount = 7;
        for(int i = 0; i <repository.findAll().size(); i++) {
            Pageable pageable = PageRequest.of(i, amount, Sort.by("tno").descending());
            Page<Todo> result = repository.findAll(pageable);
            log.info(result.getTotalElements());
            result.getContent().stream().forEach(System.out::println);
            System.out.println("==============================");
        }

    }

}
