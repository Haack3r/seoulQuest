package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.FavoriteProduct;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteProductRepository extends JpaRepository<FavoriteProduct, Long> {
    List<FavoriteProduct> findByMember(Member member);
    Optional<FavoriteProduct> findByMemberAndProduct(Member member, Product product);

}
