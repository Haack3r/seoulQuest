package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProduct is a Querydsl query type for Product
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProduct extends EntityPathBase<Product> {

    private static final long serialVersionUID = -1819542115L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProduct product = new QProduct("product");

    public final QCategory category;

    public final DatePath<java.time.LocalDate> createAt = createDate("createAt", java.time.LocalDate.class);

    public final BooleanPath delFlag = createBoolean("delFlag");

    public final StringPath pdesc = createString("pdesc");

    public final StringPath pname = createString("pname");

    public final NumberPath<Long> pno = createNumber("pno", Long.class);

    public final NumberPath<Integer> pprice = createNumber("pprice", Integer.class);

    public final NumberPath<Integer> pqty = createNumber("pqty", Integer.class);

    public final ListPath<ProductImage, QProductImage> productImageList = this.<ProductImage, QProductImage>createList("productImageList", ProductImage.class, QProductImage.class, PathInits.DIRECT2);

    public final NumberPath<Integer> shippingFee = createNumber("shippingFee", Integer.class);

    public final DatePath<java.time.LocalDate> updateAt = createDate("updateAt", java.time.LocalDate.class);

    public QProduct(String variable) {
        this(Product.class, forVariable(variable), INITS);
    }

    public QProduct(Path<? extends Product> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProduct(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProduct(PathMetadata metadata, PathInits inits) {
        this(Product.class, metadata, inits);
    }

    public QProduct(Class<? extends Product> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new QCategory(forProperty("category")) : null;
    }

}

