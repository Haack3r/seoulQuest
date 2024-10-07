package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.ProductImage;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {
    @EntityGraph(attributePaths = "imageList")
    @Query("select p form Product p where p.product_id = :product_id")
    Optional<Product> selectOne(@Param("p"))
}
