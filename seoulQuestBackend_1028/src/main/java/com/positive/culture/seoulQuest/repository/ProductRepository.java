package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {

    //전체 조회
    @Query("select p, pi from Product p left join p.productImageList pi where pi.ord = 0 and p.delFlag=false")
    Page<Object[]> selectList(Pageable pageable);

    //하나 조회
    @EntityGraph(attributePaths = "productImageList") //해당 속성 조인처리하여 쿼리 실행 횟수 줄임
    @Query("select p from Product p where p.pno = :pno")
    Optional<Product> selectOne(@Param("pno")Long pno);

    //상품 삭제 (delete 대신 update로 삭제여부를 true/false 처리 - Soft Delete)
    @Modifying
    @Query("update Product p set p.delFlag = :flag where p.pno = :pno")
    void updateToDelete(@Param("pno")Long pno, @Param("flag") boolean flag);

}
