package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Cart;
import com.positive.culture.seoulQuest.domain.CartItem;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.repository.CartItemRepository;
import com.positive.culture.seoulQuest.repository.CartRepository;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CartTest {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProductRepository productRepository;

    //insert cart
    @Test
    public void insertCart() {
        // Fetch the existing Member entity by memberId
        Member member = memberRepository.findByEmail("user1@gmail.com")
                .orElseThrow(() -> new RuntimeException("Member not found"));

        // Create a new Cart and associate it with the fetched member
        Cart cart = Cart.builder()
                .owner(member)  // Assign the fetched Member object to the owner
                .status("active")  // Set the cart status
                .build();

        // Save the cart to the database
        cartRepository.save(cart);
    }

    //insertCartItem
    @Test
    public void insertCartItem() {

        // Assuming you already have an existing cart, tour, and product in the database.
        Cart cart = cartRepository.findById(1L).orElseThrow(() -> new RuntimeException("Cart not found"));
        Product product = productRepository.findById(5L).orElse(null); // Optional, if it's a product item

        CartItem cartItem = CartItem.builder()
                .cart(cart)   // Associate with existing Cart
                .product(product)  // Associate with existing Product if it's a product item
                .pqty(51)      // Set quantity for product (if applicable)
                .build();

        cartItemRepository.save(cartItem);  // Save CartItem to the database
    }


}
