package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;

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

    public void changeTourQuantity(int tqty){this.tqty = tqty;}

}
