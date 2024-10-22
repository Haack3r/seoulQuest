package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query("select cart from Cart cart where cart.owner.memberId = :memberId")
    public Optional<Cart> getCartOfMember(@Param("memberId") String memberId);
}
