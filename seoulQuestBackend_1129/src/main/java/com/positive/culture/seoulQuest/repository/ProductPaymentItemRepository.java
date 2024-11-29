package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.ProductPayment;
import com.positive.culture.seoulQuest.domain.ProductPaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductPaymentItemRepository extends JpaRepository<ProductPaymentItem, Long> {
    //결제된 product 들의 목록을 찾음
    List<ProductPaymentItem> findByProductPaymentIn(List<ProductPayment> payments);

    @Query("SELECT DISTINCT p.product.pno, SUM(p.pPaymentQty) AS totalQty " +
            "FROM ProductPaymentItem p " +
            "WHERE p.product.delFlag = false " + // Exclude deleted products
            "GROUP BY p.product.pno " +
            "ORDER BY totalQty DESC")
    List<Object[]> findTopSellingProducts();

    List<ProductPaymentItem> findByProductPayment(ProductPayment productPayment);
}
