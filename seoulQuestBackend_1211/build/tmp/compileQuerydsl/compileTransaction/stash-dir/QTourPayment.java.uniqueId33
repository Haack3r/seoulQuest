package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTourPayment is a Querydsl query type for TourPayment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTourPayment extends EntityPathBase<TourPayment> {

    private static final long serialVersionUID = -1034635716L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTourPayment tourPayment = new QTourPayment("tourPayment");

    public final DateTimePath<java.util.Date> paymentDate = createDateTime("paymentDate", java.util.Date.class);

    public final StringPath paymentMethod = createString("paymentMethod");

    public final NumberPath<Integer> totalPrice = createNumber("totalPrice", Integer.class);

    public final QTourOrder tourOrder;

    public final NumberPath<Long> tPaymentId = createNumber("tPaymentId", Long.class);

    public final QMember tPaymentMember;

    public final QUserCoupon usedCoupon;

    public QTourPayment(String variable) {
        this(TourPayment.class, forVariable(variable), INITS);
    }

    public QTourPayment(Path<? extends TourPayment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTourPayment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTourPayment(PathMetadata metadata, PathInits inits) {
        this(TourPayment.class, metadata, inits);
    }

    public QTourPayment(Class<? extends TourPayment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.tourOrder = inits.isInitialized("tourOrder") ? new QTourOrder(forProperty("tourOrder"), inits.get("tourOrder")) : null;
        this.tPaymentMember = inits.isInitialized("tPaymentMember") ? new QMember(forProperty("tPaymentMember"), inits.get("tPaymentMember")) : null;
        this.usedCoupon = inits.isInitialized("usedCoupon") ? new QUserCoupon(forProperty("usedCoupon"), inits.get("usedCoupon")) : null;
    }

}

