package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.ReservationItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReservationItemRepository extends JpaRepository<ReservationItem,Long> {

    //예약 번호로 예약 아이템 리스트를 찾아줌
    public List<ReservationItem> findByReservationRno(Long rno);

    //reservation에 새로운 tour를 추가할때 기존 reservation에 tour가 있는지 확인하기 위한 쿼리
    @Query("select ri from ReservationItem ri inner join Reservation r on ri.reservation = r where r.owner.email = :email and ri.tour.tno = :tno")
    public ReservationItem getItemOfTno(@Param("email") String email, @Param("tno")Long tno);

    //reservationItem 번호로 reservationItem을 찾아줌
    public Optional<ReservationItem> findByRino(Long rino);

    //reservation 번호와 투어번호에 해당하는 카트 아이템들 삭제
    public void deleteByReservationRnoAndTourTnoIn(Long rno, List<Long> tnoList);
}
