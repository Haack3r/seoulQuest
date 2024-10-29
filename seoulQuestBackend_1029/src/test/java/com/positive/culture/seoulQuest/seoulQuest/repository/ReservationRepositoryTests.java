package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.Reservation;
import com.positive.culture.seoulQuest.domain.ReservationItem;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.repository.ReservationItemRepository;
import com.positive.culture.seoulQuest.repository.ReservationRepository;
import com.positive.culture.seoulQuest.repository.TourRepository;
import lombok.extern.log4j.Log4j2;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Log4j2
@SpringBootTest
public class ReservationRepositoryTests {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReservationItemRepository reservationItemRepository;

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void insertReservation(){

        Member member = memberRepository.findByEmail("user1@gmail.com").orElseThrow();
        Reservation reservation = Reservation.builder()
                .owner(member)
                .status("pending")
                .build();

        reservationRepository.save(reservation);
    }

    @Test
    public void insertReservationItems(){
        Member member = memberRepository.findByEmail("user1@gmail.com").orElseThrow();
        Optional<Reservation> reservationOptional = reservationRepository.getReservationOfMember(member.getEmail());
        Reservation reservation = reservationOptional.orElseThrow();
        Long ReservationId =reservation.getRno();

        ReservationItem reservationItem = ReservationItem.builder()
                .reservation(reservation)
                .tour(tourRepository.selectOne(1L).orElseThrow())
                .tqty(5)
                .build();

        reservationItemRepository.save(reservationItem);
    }

    @Test
    @Transactional
    public void getItemOfTnoTest(){
        String email = "user1@gmail.com";
        Long tno = 1L;

        ReservationItem reservationItem1 = reservationItemRepository.getItemOfTno(email,tno);
        System.out.println("reservationItem1 ," + reservationItem1);

        Long rino = reservationItem1.getRino();
        Optional<ReservationItem> reservationItem2 = reservationItemRepository.findReservationItemByRino(rino);
        System.out.println("reservationItem2"+ reservationItem2);
    }


}
