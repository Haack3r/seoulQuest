package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProductPayment is a Querydsl query type for ProductPayment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProductPayment extends EntityPathBase<ProductPayment> {

    private static final long serialVersionUID = -589647447L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProductPayment productPayment = new QProductPayment("productPayment");

    public final StringPath merchantUid = createString("merchantUid");

    public final DateTimePath<java.util.Date> paymentDate = createDateTime("paymentDate", java.util.Date.class);

    public final StringPath paymentMethod = createString("paymentMethod");

    public final NumberPath<java.math.BigDecimal> paymentPrice = createNumber("paymentPrice", java.math.BigDecimal.class);

    public final StringPath paymentStatus = createString("paymentStatus");

    public final NumberPath<Long> pPaymentId = createNumber("pPaymentId", Long.class);

    public final QMember pPaymentMember;

    public final QProductOrder productOrder;

    public QProductPayment(String variable) {
        this(ProductPayment.class, forVariable(variable), INITS);
    }

    public QProductPayment(Path<? extends ProductPayment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProductPayment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProductPayment(PathMetadata metadata, PathInits inits) {
        this(ProductPayment.class, metadata, inits);
    }

    public QProductPayment(Class<? extends ProductPayment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.pPaymentMember = inits.isInitialized("pPaymentMember") ? new QMember(forProperty("pPaymentMember"), inits.get("pPaymentMember")) : null;
        this.productOrder = inits.isInitialized("productOrder") ? new QProductOrder(forProperty("productOrder"), inits.get("productOrder")) : null;
    }

}

