package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    //email로 해당 카트를 찾아줌
    @Query("select cart from Cart cart where cart.owner.email = :email")
    public Optional<Cart> getCartOfMember(@Param("email") String email);
}
