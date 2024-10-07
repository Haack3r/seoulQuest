package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
    //modify
}
