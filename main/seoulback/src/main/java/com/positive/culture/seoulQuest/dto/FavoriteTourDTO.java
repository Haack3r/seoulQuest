package com.positive.culture.seoulQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteTourDTO {

    private  Long ftino;
    private String email;
    private Long tno;

    private String tname;
    private String tdesc;
    private int tprice;
    private List<String> uploadFileNames;

    private LocalDateTime addedAt;
}
