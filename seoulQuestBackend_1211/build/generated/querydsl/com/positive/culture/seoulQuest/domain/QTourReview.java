package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTourReview is a Querydsl query type for TourReview
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTourReview extends EntityPathBase<TourReview> {

    private static final long serialVersionUID = 1551504482L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTourReview tourReview = new QTourReview("tourReview");

    public final QMember member;

    public final DatePath<java.time.LocalDate> postedDate = createDate("postedDate", java.time.LocalDate.class);

    public final NumberPath<Integer> rating = createNumber("rating", Integer.class);

    public final StringPath reviewContent = createString("reviewContent");

    public final StringPath title = createString("title");

    public final QTour tour;

    public final QTourPaymentItem tourPaymentItem;

    public final NumberPath<Long> trid = createNumber("trid", Long.class);

    public QTourReview(String variable) {
        this(TourReview.class, forVariable(variable), INITS);
    }

    public QTourReview(Path<? extends TourReview> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTourReview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTourReview(PathMetadata metadata, PathInits inits) {
        this(TourReview.class, metadata, inits);
    }

    public QTourReview(Class<? extends TourReview> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
        this.tour = inits.isInitialized("tour") ? new QTour(forProperty("tour"), inits.get("tour")) : null;
        this.tourPaymentItem = inits.isInitialized("tourPaymentItem") ? new QTourPaymentItem(forProperty("tourPaymentItem"), inits.get("tourPaymentItem")) : null;
    }

}

