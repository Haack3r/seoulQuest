package com.positive.culture.seoulQuest.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Entity
@Table(name="tbl_tour_date")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "tour")
public class TourDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tour_date_id")
    private long tdid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tourNo", nullable = false)
    @JsonBackReference
    private Tour tour;

    private LocalDate tourDate;

    private int available_capacity;

    public void changeTourDate(LocalDate tourDate) {
        this.tourDate = tourDate;
    }
    public void changeAvailableCapacity(int available_capacity){
        this.available_capacity = available_capacity;
    }
}