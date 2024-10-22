package com.green.jaeyoon.goodmorning.repository;

import com.green.jaeyoon.goodmorning.domain.Cart;
import com.green.jaeyoon.goodmorning.domain.CartItem;
import com.green.jaeyoon.goodmorning.domain.Member;
import com.green.jaeyoon.goodmorning.domain.Product;
import com.green.jaeyoon.goodmorning.dto.CartItemListDTO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@SpringBootTest
@Log4j2
public class CartRepositoryTests {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Transactional
    @Commit
    @Test
    public void testInsertByProduct() {
        log.info("test1--------------------");
        String email = "user0@gmail.com";
        Long pno = 5L;
        int qty = 1;

        CartItem cartItem = cartItemRepository.getItemOfPno(email, pno);

        if (cartItem != null) {
            cartItem.changeQty(qty);
            cartItemRepository.save(cartItem);

            return;
        }
        Optional<Cart> result = cartRepository.getCartOfMember(email);

        Cart cart = null;

        if(result.isEmpty()) {
            log.info("MemberCart does not exist!!");
            Member member = Member.builder()
                    .email(email)
                    .build();

            Cart tempCart = Cart.builder()
                    .owner(member)
                    .build();

            cart = cartRepository.save(tempCart);
        }else {
            cart = result.get();
        }
        log.info(cart);
        //======================================================================

        if (cartItem == null) {
            Product product = Product.builder()
                    .pno(pno)
                    .build();
            cartItem = CartItem.builder()
                    .product(product)
                    .cart(cart)
                    .qty(qty)
                    .build();

        }
        cartItemRepository.save(cartItem);

    }
    @Test
    @Commit
    public void testUpdateByCino(){
        Long cino = 3L;
        int qty = 4;
        Optional<CartItem> result = cartItemRepository.findById(cino);
        CartItem cartItem = result.orElseThrow();
        cartItem.changeQty(qty);
        cartItemRepository.save(cartItem);
    }
    @Test
    public void testListOfMember() {
        String email = "user1@gmail.com";

        List<CartItemListDTO> cartItemList = cartItemRepository.getItemsOfCartDTOByEmail(email);

        for(CartItemListDTO dto : cartItemList) {
            log.info(dto);
        }
    }
    @Test
    public void testDeleteThenList() {

        Long cino = 3L;

        Long cno = cartItemRepository.getCartFromItem(cino);

        cartItemRepository.deleteById(cino);

        List<CartItemListDTO> cartItemList = cartItemRepository.getItemsOfCartDTOByCart(cno);

        for(CartItemListDTO dto : cartItemList) {
            log.info(dto);
        }
    }
}
