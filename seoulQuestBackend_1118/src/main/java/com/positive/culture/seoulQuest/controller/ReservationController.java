package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.ReservationItemDTO;
import com.positive.culture.seoulQuest.dto.ReservationItemListDTO;
import com.positive.culture.seoulQuest.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    @PreAuthorize("#itemDTO.email == authentication.name")
    @PostMapping("/change")
    public List<ReservationItemListDTO> changeReservation(@RequestBody ReservationItemDTO reservationItemDTO) {

        if (reservationItemDTO.getTqty() <= 0) {
            List<ReservationItemListDTO> reservationItemListDTOs = reservationService.remove(reservationItemDTO.getRino());
            log.info(reservationItemListDTOs);
            return reservationItemListDTOs;
        }

        List<ReservationItemListDTO> reservationItemListDTOs = reservationService.addOrModify(reservationItemDTO);
        return reservationItemListDTOs;
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/items")
    public List<ReservationItemListDTO> getReservationItems(Principal principal){
        String email = principal.getName();
        log.info("email: " + email);
        return reservationService.getReservationItems(email);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("/{rino}")
    public List<ReservationItemListDTO> removeFromReservation(@PathVariable("rino")Long rino){
        log.info("reservation item no: " + rino);
        return reservationService.remove(rino);
    }
}
