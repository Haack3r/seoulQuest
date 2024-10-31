package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.CartItem;
import com.positive.culture.seoulQuest.domain.ReservationItem;
import com.positive.culture.seoulQuest.dto.CartItemListDTO;
import com.positive.culture.seoulQuest.dto.ReservationItemDTO;
import com.positive.culture.seoulQuest.dto.ReservationItemListDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ReservationService {
    public List<ReservationItemListDTO> addOrModify(ReservationItemDTO reservationItemDTO);

    public List<ReservationItemListDTO> getReservationItems(String email);

    public List<ReservationItemListDTO> remove(Long rino);

    default List<ReservationItemListDTO> reservationItemEntityToDTO(List<ReservationItem> reservationItemList){
        List<ReservationItemListDTO> cartItemListDTOs = reservationItemList.stream().map(i-> ReservationItemListDTO.builder()
                .rino(i.getRino())
                .email(i.getReservation().getOwner().getEmail())
                .tname(i.getTour().getTname())
                .tno(i.getTour().getTno())
                .tfiles(i.getTour().getTourImageList().get(0).getFileName())
                .tprice(i.getTour().getTprice())
                .tqty(i.getTqty())
                .tdate(i.getTdate())
                .build()).toList();

        return cartItemListDTOs;
    }
}
