package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.CartItem;
import com.positive.culture.seoulQuest.dto.CartItemListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    //member table에서 memberId로 조회하여 product에 대한 카트 아이템 리스트를 반환
    @Query("select new CartItemListDTO(ci.cino, p.pname, p.price, ci.qty, pi.fileName)" +
            "from CartItem ci inner join Cart c on ci.cart = c " +
            "left join Product p on ci.product = p " +
            "left join p.imageList pi " +
            "where c.owner.memberId = :memberId pi.ord = 0 order by ci desc")
    public List<CartItemListDTO> getProductItemsOfCartDTOByMemberId(@Param("memberId") String memberId);

    //member table에서 memberId로 조회하여 tour에 대한 카트 아이템 리스트를 반환


}
