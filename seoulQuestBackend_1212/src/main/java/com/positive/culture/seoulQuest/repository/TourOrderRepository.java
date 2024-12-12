package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.TourOrder;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TourOrderRepository extends JpaRepository<TourOrder, Long> {
    @Query("select t from TourOrder t where t.paymentStatus = 'paid' ")
    List<TourOrder> findByPaid();
=======

public interface TourOrderRepository extends JpaRepository<TourOrder,Long> {



>>>>>>> d58b335969ccffb774c0e4f55c7437499ae8461f
}
