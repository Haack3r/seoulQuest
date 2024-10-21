package com.positive.culture.seoulQuest.domain;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="tbl_tour_date")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TourDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tour_date_id")
    private long tourDate;



}
