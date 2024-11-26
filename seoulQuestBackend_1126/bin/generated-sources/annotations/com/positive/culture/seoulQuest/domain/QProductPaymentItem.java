package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProductPaymentItem is a Querydsl query type for ProductPaymentItem
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProductPaymentItem extends EntityPathBase<ProductPaymentItem> {

    private static final long serialVersionUID = -1484086180L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProductPaymentItem productPaymentItem = new QProductPaymentItem("productPaymentItem");

    public final StringPath pname = createString("pname");

    public final NumberPath<Long> pPaymentItemId = createNumber("pPaymentItemId", Long.class);

    public final NumberPath<Integer> pPaymentQty = createNumber("pPaymentQty", Integer.class);

    public final NumberPath<Integer> pprice = createNumber("pprice", Integer.class);

    public final QProduct product;

    public final QProductPayment productPayment;

    public QProductPaymentItem(String variable) {
        this(ProductPaymentItem.class, forVariable(variable), INITS);
    }

    public QProductPaymentItem(Path<? extends ProductPaymentItem> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProductPaymentItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProductPaymentItem(PathMetadata metadata, PathInits inits) {
        this(ProductPaymentItem.class, metadata, inits);
    }

    public QProductPaymentItem(Class<? extends ProductPaymentItem> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.product = inits.isInitialized("product") ? new QProduct(forProperty("product"), inits.get("product")) : null;
        this.productPayment = inits.isInitialized("productPayment") ? new QProductPayment(forProperty("productPayment"), inits.get("productPayment")) : null;
    }

}

