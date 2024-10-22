package com.green.jaeyoon.goodmorning.repository;

import com.green.jaeyoon.goodmorning.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

//==========================================
//This repository will handle Cart Entity.

//CartRepository uses the user's email to search for Cart through the operation provided by JpaRepository
//==========================================

public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query("select cart from Cart cart where cart.owner.email = :email")
    public Optional<Cart> getCartOfMember(@Param("email") String email);
}
