package com.positive.culture.seoulQuest.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ReservationItemDTO {

    private Long rino;
    private String email;
    private Long tno;
    private int tqty;

    private LocalDate tdate;

}
