package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTour is a Querydsl query type for Tour
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTour extends EntityPathBase<Tour> {

    private static final long serialVersionUID = 600811626L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTour tour = new QTour("tour");

    public final QCategory category;

    public final DatePath<java.time.LocalDate> createAt = createDate("createAt", java.time.LocalDate.class);

    public final BooleanPath delFlag = createBoolean("delFlag");

    public final NumberPath<Integer> maxCapacity = createNumber("maxCapacity", Integer.class);

    public final StringPath taddress = createString("taddress");

    public final StringPath tdesc = createString("tdesc");

    public final StringPath tname = createString("tname");

    public final NumberPath<Long> tno = createNumber("tno", Long.class);

    public final ListPath<TourDate, QTourDate> tourDateList = this.<TourDate, QTourDate>createList("tourDateList", TourDate.class, QTourDate.class, PathInits.DIRECT2);

    public final ListPath<TourImage, QTourImage> tourImageList = this.<TourImage, QTourImage>createList("tourImageList", TourImage.class, QTourImage.class, PathInits.DIRECT2);

    public final NumberPath<Integer> tprice = createNumber("tprice", Integer.class);

    public final DatePath<java.time.LocalDate> updateAt = createDate("updateAt", java.time.LocalDate.class);

    public QTour(String variable) {
        this(Tour.class, forVariable(variable), INITS);
    }

    public QTour(Path<? extends Tour> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTour(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTour(PathMetadata metadata, PathInits inits) {
        this(Tour.class, metadata, inits);
    }

    public QTour(Class<? extends Tour> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new QCategory(forProperty("category")) : null;
    }

}

