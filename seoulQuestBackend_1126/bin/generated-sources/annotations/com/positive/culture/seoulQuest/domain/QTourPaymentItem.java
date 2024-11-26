package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTourPaymentItem is a Querydsl query type for TourPaymentItem
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTourPaymentItem extends EntityPathBase<TourPaymentItem> {

    private static final long serialVersionUID = -2139478161L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTourPaymentItem tourPaymentItem = new QTourPaymentItem("tourPaymentItem");

    public final DatePath<java.time.LocalDate> tdate = createDate("tdate", java.time.LocalDate.class);

    public final StringPath tname = createString("tname");

    public final QTour tour;

    public final QTourPayment tourPayment;

    public final NumberPath<Long> tPaymentItemId = createNumber("tPaymentItemId", Long.class);

    public final NumberPath<Integer> tPaymentQty = createNumber("tPaymentQty", Integer.class);

    public final NumberPath<Integer> tprice = createNumber("tprice", Integer.class);

    public QTourPaymentItem(String variable) {
        this(TourPaymentItem.class, forVariable(variable), INITS);
    }

    public QTourPaymentItem(Path<? extends TourPaymentItem> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTourPaymentItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTourPaymentItem(PathMetadata metadata, PathInits inits) {
        this(TourPaymentItem.class, metadata, inits);
    }

    public QTourPaymentItem(Class<? extends TourPaymentItem> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.tour = inits.isInitialized("tour") ? new QTour(forProperty("tour"), inits.get("tour")) : null;
        this.tourPayment = inits.isInitialized("tourPayment") ? new QTourPayment(forProperty("tourPayment"), inits.get("tourPayment")) : null;
    }

}

