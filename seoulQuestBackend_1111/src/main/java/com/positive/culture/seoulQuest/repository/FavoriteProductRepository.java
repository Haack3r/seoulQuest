package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.FavoriteProduct;
import com.positive.culture.seoulQuest.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteProductRepository extends JpaRepository<FavoriteProduct, Long> {
    List<FavoriteProduct> findByMember(Member member);
}
