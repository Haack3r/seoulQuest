package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.CartItemDTO;
import com.positive.culture.seoulQuest.dto.CartItemListDTO;
import com.positive.culture.seoulQuest.service.CartService;
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
public class CartController {

    private final CartService cartService;

    //카트 아이템 추가, 수정
    @PreAuthorize("#itemDTO.email == authentication.name")
    @PostMapping("/change")
    public List<CartItemListDTO> changeCart(@RequestBody CartItemDTO itemDTO){
        //카트에 아이템이 없을때
        if(itemDTO.getPqty()<=0){
            List<CartItemListDTO> cartItemListDTOList = cartService.remove(itemDTO.getCino());
            log.info(cartItemListDTOList);
            return cartItemListDTOList;
        }

        List<CartItemListDTO> cartItemListDTOList =  cartService.addOrModify(itemDTO);
        return cartItemListDTOList;
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/items")
    public List<CartItemListDTO> getCartItems(Principal principal){
        String email = principal.getName();
        log.info("email:" + email);
        return cartService.getCartItems(email);
    }

    //카트 아이템 삭제
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("/{cino}")
    public List<CartItemListDTO> removeFromCart(@PathVariable("cino") Long cino){
        log.info("cart item no : " + cino);
        return cartService.remove(cino);
    }
}
