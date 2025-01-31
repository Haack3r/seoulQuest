package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.CartItem;
import com.positive.culture.seoulQuest.dto.CartItemDTO;
import com.positive.culture.seoulQuest.dto.CartItemListDTO;
import jakarta.transaction.Transactional;

import java.util.List;

@Transactional
public interface CartService {
    // 1. getCart로 사용자의 카트가 있는지 조회하고 없으면 새로 생성.

    // 2. Cart에 아이템 추가 혹은 변경
    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO);

    // 3. 모든 CartItemList 조회
    public List<CartItemListDTO> getCartItems(String email);

    // 4. cartItem 삭제하고 cartitemlist 반환
    public List<CartItemListDTO> remove(Long cino);

    default List<CartItemListDTO> cartItemEntityToDTO(List<CartItem> cartItemList) {
        List<CartItemListDTO> cartItemListDTOs = cartItemList.stream().map(i -> CartItemListDTO.builder()
                .cino(i.getCino())
                .email(i.getCart().getOwner().getEmail())
                .pname(i.getProduct().getPname())
                .pno(i.getProduct().getPno())
                .pfiles(i.getProduct().getProductImageList().get(0).getFileName())
                .pprice(i.getProduct().getPprice())
                .pqty(i.getPqty())
                .shippingFee(i.getProduct().getShippingFee())
                .stock(i.getProduct().getPqty())
                .build()).toList();

        return cartItemListDTOs;
    }

}
