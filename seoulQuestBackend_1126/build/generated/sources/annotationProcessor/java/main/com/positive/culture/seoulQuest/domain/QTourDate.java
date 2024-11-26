package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTourDate is a Querydsl query type for TourDate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTourDate extends EntityPathBase<TourDate> {

    private static final long serialVersionUID = -374225096L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTourDate tourDate1 = new QTourDate("tourDate1");

    public final NumberPath<Integer> availableCapacity = createNumber("availableCapacity", Integer.class);

    public final NumberPath<Long> tdid = createNumber("tdid", Long.class);

    public final QTour tour;

    public final DatePath<java.time.LocalDate> tourDate = createDate("tourDate", java.time.LocalDate.class);

    public QTourDate(String variable) {
        this(TourDate.class, forVariable(variable), INITS);
    }

    public QTourDate(Path<? extends TourDate> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTourDate(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTourDate(PathMetadata metadata, PathInits inits) {
        this(TourDate.class, metadata, inits);
    }

    public QTourDate(Class<? extends TourDate> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.tour = inits.isInitialized("tour") ? new QTour(forProperty("tour"), inits.get("tour")) : null;
    }

}

