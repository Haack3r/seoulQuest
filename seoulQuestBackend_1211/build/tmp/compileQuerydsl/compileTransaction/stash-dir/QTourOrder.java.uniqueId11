package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTourOrder is a Querydsl query type for TourOrder
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTourOrder extends EntityPathBase<TourOrder> {

    private static final long serialVersionUID = 1294573828L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTourOrder tourOrder = new QTourOrder("tourOrder");

    public final StringPath country = createString("country");

    public final StringPath firstName = createString("firstName");

    public final StringPath lastName = createString("lastName");

    public final DateTimePath<java.time.LocalDateTime> orderDate = createDateTime("orderDate", java.time.LocalDateTime.class);

    public final StringPath paymentStatus = createString("paymentStatus");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final NumberPath<Long> tOrderId = createNumber("tOrderId", Long.class);

    public final QMember tOrderMember;

    public final NumberPath<Integer> totalPrice = createNumber("totalPrice", Integer.class);

    public QTourOrder(String variable) {
        this(TourOrder.class, forVariable(variable), INITS);
    }

    public QTourOrder(Path<? extends TourOrder> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTourOrder(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTourOrder(PathMetadata metadata, PathInits inits) {
        this(TourOrder.class, metadata, inits);
    }

    public QTourOrder(Class<? extends TourOrder> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.tOrderMember = inits.isInitialized("tOrderMember") ? new QMember(forProperty("tOrderMember"), inits.get("tOrderMember")) : null;
    }

}

