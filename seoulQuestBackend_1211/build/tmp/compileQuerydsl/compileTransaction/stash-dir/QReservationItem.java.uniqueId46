package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReservationItem is a Querydsl query type for ReservationItem
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReservationItem extends EntityPathBase<ReservationItem> {

    private static final long serialVersionUID = 1328222125L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReservationItem reservationItem = new QReservationItem("reservationItem");

    public final QReservation reservation;

    public final NumberPath<Long> rino = createNumber("rino", Long.class);

    public final DatePath<java.time.LocalDate> tdate = createDate("tdate", java.time.LocalDate.class);

    public final QTour tour;

    public final NumberPath<Integer> tqty = createNumber("tqty", Integer.class);

    public QReservationItem(String variable) {
        this(ReservationItem.class, forVariable(variable), INITS);
    }

    public QReservationItem(Path<? extends ReservationItem> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReservationItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReservationItem(PathMetadata metadata, PathInits inits) {
        this(ReservationItem.class, metadata, inits);
    }

    public QReservationItem(Class<? extends ReservationItem> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.reservation = inits.isInitialized("reservation") ? new QReservation(forProperty("reservation"), inits.get("reservation")) : null;
        this.tour = inits.isInitialized("tour") ? new QTour(forProperty("tour"), inits.get("tour")) : null;
    }

}

