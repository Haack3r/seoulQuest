package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFavoriteProduct is a Querydsl query type for FavoriteProduct
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFavoriteProduct extends EntityPathBase<FavoriteProduct> {

    private static final long serialVersionUID = 130643553L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFavoriteProduct favoriteProduct = new QFavoriteProduct("favoriteProduct");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMember member;

    public final QProduct product;

    public QFavoriteProduct(String variable) {
        this(FavoriteProduct.class, forVariable(variable), INITS);
    }

    public QFavoriteProduct(Path<? extends FavoriteProduct> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFavoriteProduct(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFavoriteProduct(PathMetadata metadata, PathInits inits) {
        this(FavoriteProduct.class, metadata, inits);
    }

    public QFavoriteProduct(Class<? extends FavoriteProduct> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
        this.product = inits.isInitialized("product") ? new QProduct(forProperty("product"), inits.get("product")) : null;
    }

}

