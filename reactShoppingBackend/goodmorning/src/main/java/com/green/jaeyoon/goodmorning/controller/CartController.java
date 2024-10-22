package com.green.jaeyoon.goodmorning.controller;

import com.green.jaeyoon.goodmorning.dto.CartItemDTO;
import com.green.jaeyoon.goodmorning.dto.CartItemListDTO;
import com.green.jaeyoon.goodmorning.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/cart")
// p462
public class CartController {
    private final CartService cartService;
    // p463
    @PreAuthorize("#itemDTO.email == authentication.name")
    @PostMapping("/change")
    public List<CartItemListDTO> changeCart(@RequestBody CartItemDTO itemDTO) {
        log.info("changeCart : "+itemDTO);
        if (itemDTO.getQty() <= 0){
            return cartService.remove(itemDTO.getCino());
        }
        return cartService.addOrModify(itemDTO);
    }

    // p465
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/items")
    public List<CartItemListDTO> getCartItems(Principal principal) {
        String email = principal.getName();
        log.info("----------");
        log.info("getCartItems : "+email);
        return cartService.getCartItems(email);
    }

    // p466
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("/{cino}")
    public List<CartItemListDTO> removeFromCart(@PathVariable("cino") Long cino) {
        log.info("removeFromCart : "+cino);
        return cartService.remove(cino);
    }
}