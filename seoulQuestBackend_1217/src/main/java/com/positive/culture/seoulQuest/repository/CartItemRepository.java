package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

   //-----카트번호로 특정 카트에 대한 카트아이템들의 리스트를 찾아줌----------
   public List<CartItem> findCartItemByCartCno(Long cno);


   //-----새로운 상품을 장바구니에 담고자할때 기존 장바구니에 product가 있는지 확인하기위하여 필요----------
   @Query("select ci from CartItem ci inner join Cart c on ci.cart = c where c.owner.email = :email and ci.product.pno=:pno")
   public CartItem getItemOfPno(@Param("email") String email, @Param("pno")Long pno);


   //-----카트아이템번호로 카트아이템을 찾아줌
   public Optional<CartItem> findCartItemByCino(Long cino);

   //카트 번호와 상품번호에 해당하는 카트 아이템들 삭제
   public void deleteByCartCnoAndProductPnoIn(Long cno, List<Long> pnoList);


}
