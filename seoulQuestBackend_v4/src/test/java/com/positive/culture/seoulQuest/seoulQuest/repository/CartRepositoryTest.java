package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Cart;
import com.positive.culture.seoulQuest.dto.CartItemListDTO;
import com.positive.culture.seoulQuest.repository.CartItemRepository;
import com.positive.culture.seoulQuest.repository.CartRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@Log4j2
@SpringBootTest
public class CartRepositoryTest {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;


    //memberId로 카트 조회
    @Test
    public void testGetCartbyId(){
        Optional<Cart> cart = cartRepository.getCartOfMember("user1@gmail.com");
    }

    //cart item repository테스트
    @Test
    public void testGetCartItemList(){
        List<CartItemListDTO> cartItemListDTOS = cartItemRepository.getProductItemsOfCartDTOByMemberId("user1@gmail.com");
     }
}
