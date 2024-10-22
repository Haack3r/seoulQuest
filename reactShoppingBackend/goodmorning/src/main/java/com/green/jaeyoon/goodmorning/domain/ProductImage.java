package com.green.jaeyoon.goodmorning.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable     // 해당 클래스의 인스턴스가 값 타입 객체임을 명시
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductImage {

    private String fileName;
    private int ord;

    public void setOrd(int ord) {
        this.ord = ord;
    }
}
