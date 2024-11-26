package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTourOrderItem is a Querydsl query type for TourOrderItem
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTourOrderItem extends EntityPathBase<TourOrderItem> {

    private static final long serialVersionUID = 1842114103L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTourOrderItem tourOrderItem = new QTourOrderItem("tourOrderItem");

    public final DatePath<java.time.LocalDate> tdate = createDate("tdate", java.time.LocalDate.class);

    public final StringPath tname = createString("tname");

    public final NumberPath<Long> tno = createNumber("tno", Long.class);

    public final NumberPath<Long> tOrderItemId = createNumber("tOrderItemId", Long.class);

    public final NumberPath<Integer> tOrderQty = createNumber("tOrderQty", Integer.class);

    public final QTourOrder tourOrder;

    public final NumberPath<Integer> tprice = createNumber("tprice", Integer.class);

    public QTourOrderItem(String variable) {
        this(TourOrderItem.class, forVariable(variable), INITS);
    }

    public QTourOrderItem(Path<? extends TourOrderItem> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTourOrderItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTourOrderItem(PathMetadata metadata, PathInits inits) {
        this(TourOrderItem.class, metadata, inits);
    }

    public QTourOrderItem(Class<? extends TourOrderItem> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.tourOrder = inits.isInitialized("tourOrder") ? new QTourOrder(forProperty("tourOrder"), inits.get("tourOrder")) : null;
    }

}

