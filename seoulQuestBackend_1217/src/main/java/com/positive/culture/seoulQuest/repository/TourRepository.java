package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Tour;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TourRepository extends JpaRepository<Tour, Long>, QuerydslPredicateExecutor<Tour> {

    // 전체 조회
    @Query("select t, ti from Tour t left join t.tourImageList ti where ti.ord = 0 and t.delFlag=false")
    Page<Object[]> selectList(Pageable pageable);

    // 하나 조회
    @EntityGraph(attributePaths = "tourImageList") // 해당 속성 조인처리하여 쿼리 실행 횟수 줄임
    @Query("select t from Tour t where t.tno = :tno")
    Optional<Tour> selectOne(@Param("tno") Long tno);

    // 상품 삭제 (delete 대신 update로 삭제여부를 true/false 처리 - Soft Delete)
    @Modifying
    @Query("update Tour t set t.delFlag = :flag where t.tno = :tno")
    void updateToDelete(@Param("tno") Long tno, @Param("flag") boolean flag);

    List<Tour> findByTaddress(String taddress);

    Page<Tour> findByCategory_CategoryName(Pageable pageable, String categoryName);

    // 이미지 포함한 여행 정보 조회
    @Query("select t from Tour t " +
            "left join fetch t.tourImageList " +
            "where t.delFlag = false " +
            "and (:keyword is null or t.tname like concat('%',:keyword,'%'))")
    Page<Tour> AdminTourList(Pageable pageable, @Param("keyword") String keyword);

    @Modifying
    @Query(value = "delete til from tour_image_list til " +
            "where til.tour_tno = :tno and til.file_name = :fileName", nativeQuery = true)
    void deleteTourImage(@Param("tno") Long tno, @Param("fileName") String fileName);

}
