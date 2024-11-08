package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_reservation_item",
        indexes = {@Index(columnList = "reservation_rno", name ="idx_reservationitem_reservation"),
                    @Index(columnList = "tour_tno, reservation_rno", name="idx_reservation_tno_reservation")
        })
@ToString(exclude = "reservation")
public class ReservationItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long rino;

    @ManyToOne
    @JoinColumn(name="reservation_rno")
    private Reservation reservation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="tour_tno", nullable = false)
    private Tour tour;

    private int tqty;

    private LocalDate tdate;

    public void changeTourQuantity(int tqty){this.tqty = tqty;}

    public void changeTourDate(LocalDate tdate){this.tdate = tdate;}
}
