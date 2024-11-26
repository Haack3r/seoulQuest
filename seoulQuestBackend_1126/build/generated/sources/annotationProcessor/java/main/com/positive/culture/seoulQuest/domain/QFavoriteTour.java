package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFavoriteTour is a Querydsl query type for FavoriteTour
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFavoriteTour extends EntityPathBase<FavoriteTour> {

    private static final long serialVersionUID = -1717664218L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFavoriteTour favoriteTour = new QFavoriteTour("favoriteTour");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final QMember member;

    public final NumberPath<Long> tid = createNumber("tid", Long.class);

    public final QTour tour;

    public QFavoriteTour(String variable) {
        this(FavoriteTour.class, forVariable(variable), INITS);
    }

    public QFavoriteTour(Path<? extends FavoriteTour> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFavoriteTour(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFavoriteTour(PathMetadata metadata, PathInits inits) {
        this(FavoriteTour.class, metadata, inits);
    }

    public QFavoriteTour(Class<? extends FavoriteTour> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
        this.tour = inits.isInitialized("tour") ? new QTour(forProperty("tour"), inits.get("tour")) : null;
    }

}

