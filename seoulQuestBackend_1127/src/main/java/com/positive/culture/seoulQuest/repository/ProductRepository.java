package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, QuerydslPredicateExecutor<Product> {

     //전체 조회
     @Query("select p, pi from Product p left join p.productImageList pi where pi.ord = 0 and p.delFlag=false")
     Page<Object[]> selectList(Pageable pageable);

    // 하나 조회
    @EntityGraph(attributePaths = "productImageList") // 해당 속성 조인처리하여 쿼리 실행 횟수 줄임
    @Query("select p from Product p where p.pno = :pno")
    Optional<Product> selectOne(@Param("pno") Long pno);

    // 상품 삭제 (delete 대신 update로 삭제여부를 true/false 처리 - Soft Delete)
    @Modifying
    @Query("update Product p set p.delFlag = :flag where p.pno = :pno")
    void updateToDelete(@Param("pno") Long pno, @Param("flag") boolean flag);

    // 이미지 포함한 상품 정보 조회
    @Query("select p from Product p " +
            "left join fetch p.productImageList " +
            "where p.delFlag = false " +
            "and (:keyword is null or p.pname like concat('%',:keyword,'%'))")
    Page<Product> AdminProductList(Pageable pageable, @Param("keyword") String keyword);

    // 이미지 없이 상품 정보만 조회
    @Query("select p from Product p " +
            "where p.delFlag = false " +
            "and (:keyword is null or p.pname like concat('%',:keyword,'%'))")
    Page<Product> AdminProductListNoImage(Pageable pageable, @Param("keyword") String keyword);

    // 특정 상품의 이미지 삭제
    @Modifying
    @Query("delete from Product p join p.productImageList pi where p.pno = :pno and pi.fileName = :fileName")
    void deleteProductImage(@Param("pno") Long pno, @Param("fileName") String fileName);

    /*
     * ------------------------AI 추천 쿼리문( 써도 되고 안 써도 되고
     * )--------------------------------
     */

    // // 카테고리별 상품 조회
    // @Query("select p, pi from Product p left join p.productImageList pi " +
    // "where pi.ord = 0 and p.delFlag = false and p.category.categoryName =
    // :categoryName")
    // Page<Object[]> findByCategory(@Param("categoryName") String categoryName,
    // Pageable pageable);
    //
    // // 가격 범위로 상품 검색
    // @Query("select p, pi from Product p left join p.productImageList pi " +
    // "where pi.ord = 0 and p.delFlag = false " +
    // "and p.pprice between :minPrice and :maxPrice")
    // Page<Object[]> findByPriceRange(
    // @Param("minPrice") int minPrice,
    // @Param("maxPrice") int maxPrice,
    // Pageable pageable);
    //
    // // 상품명 또는 설명으로 검색
    // @Query("select p, pi from Product p left join p.productImageList pi " +
    // "where pi.ord = 0 and p.delFlag = false " +
    // "and (p.pname like %:keyword% or p.pdesc like %:keyword%)")
    // Page<Object[]> searchByKeyword(@Param("keyword") String keyword, Pageable
    // pageable);
    //
    // // 재고 부족 상품 조회 (재고관리용)
    // @Query("select p from Product p where p.delFlag = false and p.pqty <=
    // :threshold")
    // List<Product> findLowStockProducts(@Param("threshold") int threshold);
    //
    // // 최근 등록된 상품 조회
    // @Query("select p, pi from Product p left join p.productImageList pi " +
    // "where pi.ord = 0 and p.delFlag = false " +
    // "order by p.createAt desc")
    // Page<Object[]> findRecentProducts(Pageable pageable);
    //
    // // 인기상품 조회 (좋아요 순)
    // @Query("select p, pi from Product p left join p.productImageList pi " +
    // "where pi.ord = 0 and p.delFlag = false " +
    // "order by p.likesCount desc")
    // Page<Object[]> findPopularProducts(Pageable pageable);
    //
    // // 특정 가격 이하의 상품 조회
    // @Query("select p, pi from Product p left join p.productImageList pi " +
    // "where pi.ord = 0 and p.delFlag = false and p.pprice <= :maxPrice")
    // Page<Object[]> findByPriceLessThanEqual(@Param("maxPrice") int maxPrice,
    // Pageable pageable);
    //
    // // 카테고리별 평균 가격 조회
    // @Query("select p.category.categoryName, avg(p.pprice) as avgPrice " +
    // "from Product p where p.delFlag = false " +
    // "group by p.category.categoryName")
    // List<Object[]> findAveragePriceByCategory();
    //
    // // 카테고리별 상품 수 조회
    // @Query("select p.category.categoryName, count(p) as productCount " +
    // "from Product p where p.delFlag = false " +
    // "group by p.category.categoryName")
    // List<Object[]> countProductsByCategory();
    //
    // // 특정 기간 내 등록된 상품 조회
    // @Query("select p, pi from Product p left join p.productImageList pi " +
    // "where pi.ord = 0 and p.delFlag = false " +
    // "and p.createAt between :startDate and :endDate")
    // Page<Object[]> findProductsByDateRange(
    // @Param("startDate") LocalDate startDate,
    // @Param("endDate") LocalDate endDate,
    // Pageable pageable);
}
