package com.green.jaeyoon.goodmorning.service;

import com.green.jaeyoon.goodmorning.dto.CartItemDTO;
import com.green.jaeyoon.goodmorning.dto.CartItemListDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional

public interface CartService {
    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO);

    public List<CartItemListDTO> getCartItems(String email);

    public List<CartItemListDTO> remove(Long cino);
}
