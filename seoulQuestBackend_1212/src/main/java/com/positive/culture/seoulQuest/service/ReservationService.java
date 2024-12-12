package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.CartItem;
import com.positive.culture.seoulQuest.domain.Reservation;
import com.positive.culture.seoulQuest.domain.ReservationItem;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.dto.CartItemListDTO;
import com.positive.culture.seoulQuest.dto.ReservationItemDTO;
import com.positive.culture.seoulQuest.dto.ReservationItemListDTO;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Transactional
public interface ReservationService {
    public List<ReservationItemListDTO> addOrModify(ReservationItemDTO reservationItemDTO);

    public List<ReservationItemListDTO> getReservationItems(String email);

    public List<ReservationItemListDTO> remove(Long rino);

    default List<ReservationItemListDTO> reservationItemEntityToDTO(List<ReservationItem> reservationItemList) {
        return reservationItemList.stream().map(item -> {
            Tour tour = item.getTour();
            Reservation reservation = item.getReservation();
            LocalDate tdate = item.getTdate();

            // 투어 날짜 필터링 후 availableCapacity 가져오기
            int availableCapacity = tour.getTourDateList().stream()
                    .filter(date -> date.getTdate().equals(tdate))
                    .findFirst()
                    .orElseThrow()
                    .getAvailableCapacity();

            // DTO 빌더 사용
            return ReservationItemListDTO.builder()
                    .rino(item.getRino())
                    .email(reservation.getOwner().getEmail())
                    .tname(tour.getTname())
                    .tno(tour.getTno())
                    .tfiles(tour.getTourImageList().get(0).getFileName())
                    .tprice(tour.getTprice())
                    .tqty(item.getTqty())
                    .tdate(tdate)
                    .availableCapacity(availableCapacity)
                    .build();
        }).toList();
    }

}
