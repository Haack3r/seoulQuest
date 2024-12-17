package com.positive.culture.seoulQuest.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTourImage is a Querydsl query type for TourImage
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QTourImage extends BeanPath<TourImage> {

    private static final long serialVersionUID = 1288880913L;

    public static final QTourImage tourImage = new QTourImage("tourImage");

    public final StringPath fileName = createString("fileName");

    public final NumberPath<Integer> ord = createNumber("ord", Integer.class);

    public QTourImage(String variable) {
        super(TourImage.class, forVariable(variable));
    }

    public QTourImage(Path<? extends TourImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTourImage(PathMetadata metadata) {
        super(TourImage.class, metadata);
    }

}

