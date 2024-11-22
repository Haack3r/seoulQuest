//package com.positive.culture.seoulQuest.domain;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@AllArgsConstructor
//@NoArgsConstructor
//@ToString
//@Table(name = "tbl_product_order_item")
//@Builder
//@Getter
//public class ProductOrderItem {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long pOrderItemId;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "p_order_id")
//    private ProductOrder productOrder;
//
//    private int pOrderQty; //상품 주문수량
//
//
//    //상품이 수정될 수 있으므로 product 엔티티와 @OneToOne관계로 연결하지 않고
//    //주문당시의 상품 정보를 따로 저장함.
//    private Long pno;
//    private String pname;
//    private int pprice;
//
//
////    @OneToOne(fetch = FetchType.LAZY)
////    @JoinColumn(name = "cartItemId")
////    private CartItem cartItem;
//
//}
