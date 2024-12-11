package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    //email로 해당 reservation을 찾아줌
    @Query("select reservation from Reservation reservation where reservation.owner.email = :email")
    public Optional<Reservation> getReservationOfMember(@Param("email") String email);

}
