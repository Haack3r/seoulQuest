package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.ProductPayment;
import com.positive.culture.seoulQuest.domain.ProductPaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface ProductPaymentItemRepository extends JpaRepository<ProductPaymentItem, Long> {
        // 결제된 product 들의 목록을 찾음
        List<ProductPaymentItem> findByProductPaymentIn(List<ProductPayment> payments);

        @Query("SELECT DISTINCT p.product.pno, SUM(p.pPaymentQty) AS totalQty " +
                        "FROM ProductPaymentItem p " +
                        "WHERE p.product.delFlag = false " + // Exclude deleted products
                        "GROUP BY p.product.pno " +
                        "ORDER BY totalQty DESC")
        List<Object[]> findTopSellingProducts();

        List<ProductPaymentItem> findByProductPayment(ProductPayment productPayment);

        // 오늘의 상품 판매 건수 조회
        @Query("SELECT COUNT(ppi) FROM ProductPaymentItem ppi WHERE DATE(ppi.productPayment.paymentDate) = CURRENT_DATE")
        Long countTodayProducts();

        // 총 매출액 조회
        @Query("SELECT SUM(ppi.pprice * ppi.pPaymentQty) FROM ProductPaymentItem ppi")
        Long calculateTotalRevenue();

        // @Query("SELECT DISTINCT p.product.pno as productId, p.product.pname as
        // productName, " +
        // "SUM(p.pPaymentQty) AS salesCount " +
        // "FROM ProductPaymentItem p " +
        // "WHERE p.product.delFlag = false " +
        // "GROUP BY p.product.pno, p.product.pname " +
        // "ORDER BY salesCount DESC")
        @Query(value = "SELECT DISTINCT p.pno as productId, pr.pname as productName, " +
                        "SUM(p.p_payment_qty) AS salesCount, " +
                        "SUM(p.pprice * p.p_payment_qty) AS totalRevenue " +
                        "FROM tbl_product_payment_item p " +
                        "JOIN tbl_product pr ON p.pno = pr.pno " +
                        "JOIN tbl_product_payment pp ON p.p_payment_id = pp.p_payment_id " +
                        "WHERE pp.payment_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) " +
                        "AND pr.del_flag = false " +
                        "GROUP BY p.pno, pr.pname " +
                        "ORDER BY totalRevenue DESC", nativeQuery = true)
        List<Object[]> findWeeklyTopSellingProducts();

        // ProductPaymentItemRepository.java
        @Query("SELECT SUM(ppi.pprice * ppi.pPaymentQty) FROM ProductPaymentItem ppi " +
                        "WHERE ppi.productPayment.paymentDate BETWEEN :startDate AND :endDate")
        Long calculateLastWeekProductRevenue(
                        @Param("startDate") LocalDateTime startDate,
                        @Param("endDate") LocalDateTime endDate);
}
