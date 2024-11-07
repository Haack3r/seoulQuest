package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.*;
import com.positive.culture.seoulQuest.dto.ReservationItemDTO;
import com.positive.culture.seoulQuest.dto.ReservationItemListDTO;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.repository.ReservationItemRepository;
import com.positive.culture.seoulQuest.repository.ReservationRepository;
import com.positive.culture.seoulQuest.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Log4j2
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private final ReservationRepository reservationRepository;

    @Autowired
    private final ReservationItemRepository reservationItemRepository;

    @Autowired
    private final TourRepository tourRepository;

    @Autowired
    private final MemberRepository memberRepository;


    @Override
    public List<ReservationItemListDTO> addOrModify(ReservationItemDTO reservationItemDTO) {
        Long rino = reservationItemDTO.getRino();
        String email = reservationItemDTO.getEmail();
        Long tno = reservationItemDTO.getTno();
        int tqty = reservationItemDTO.getTqty();
        LocalDate tdate = reservationItemDTO.getTdate();

        System.out.println("rino: " + rino + ", email: " + email + ", tno: " + tno + ", tqty: " + tqty +", tDate : " + tdate);

        if(rino!= null){
            Optional<ReservationItem> ReservationItemResult = reservationItemRepository.findById(rino);
            ReservationItem reservationItem = ReservationItemResult.orElseThrow();

            reservationItem.changeTourQuantity(tqty);
            reservationItem.changeTourDate(tdate);
            reservationItemRepository.save(reservationItem);

            return getReservationItems(email);
        }

        Reservation reservation = getReservation(email);

        ReservationItem reservationItem = null;

        reservationItem = reservationItemRepository.getItemOfTno(email, tno);

        if(reservationItem == null){
            Tour tour = tourRepository.findById(tno).orElseThrow();
            reservationItem = ReservationItem.builder().tour(tour).reservation(reservation).tqty(tqty).tdate(tdate).build();
        }else{
            log.info("원래 있던 예약날짜 : " + reservationItem.getTdate());
            reservationItem.changeTourQuantity(tqty);

            // 투어아이템이 이미 있는경우, 날짜를 변경
            reservationItem.changeTourDate(tdate);

            log.info("이미있는 예약 날짜 변경:" + reservationItem.getTdate());
        }

        reservationItemRepository.save(reservationItem);
        return getReservationItems(email);
    }

    private Reservation getReservation(String email) {
        Reservation reservation = null;

        Optional<Reservation> result =  reservationRepository.getReservationOfMember(email);
        if(result.isEmpty()) {
            log.info("Reservation of the member is not exist!");

            Member member = memberRepository.findByEmail(email).orElseThrow();
            Reservation tempReservation = Reservation.builder().owner(member).build();

            reservation = reservationRepository.save(tempReservation);
        }else{
            reservation = result.get();
        }
        return reservation;
    }

    @Override
    public List<ReservationItemListDTO> getReservationItems(String email) {

        List<Reservation> reservationList = reservationRepository.findAll();
        Reservation reservation = reservationList.stream()
                .filter(i->{
                    System.out.println("filter inner ) "+i);
                    // 조건에 맞는 Cart를 필터링
                    System.out.println("email1: " + i.getOwner().getEmail());
                    System.out.println("email2: " + email);
                    return i.getOwner().getEmail().equals(email);
                })
                .findFirst()
                .orElse(null);

        List<ReservationItem> reservationItemList = reservationItemRepository.findByReservationRno(reservation.getRno());

        return reservationItemEntityToDTO(reservationItemList);
    }

    @Override
    public List<ReservationItemListDTO> remove(Long rino) {
        Optional<ReservationItem> reservationItem = reservationItemRepository.findByRino(rino);
        Long rno = reservationItem.orElseThrow().getReservation().getRno();

        reservationItemRepository.deleteById(rino);

        List<ReservationItem> reservationItemList = reservationItemRepository.findByReservationRno(rno);

        return reservationItemEntityToDTO(reservationItemList);
    }
}
