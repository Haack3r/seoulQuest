package com.positive.culture.seoulQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationItemListDTO {
    private Long rino;
    private String email;

    private Long tno;
    private String tname;
    private int tprice;
    private int tqty;
    private int availableCapacity;

    private String tfiles;
    private LocalDate tdate;

}
