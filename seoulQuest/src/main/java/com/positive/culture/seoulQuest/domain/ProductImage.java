package com.positive.culture.seoulQuest.domain;
import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductImage {
    private String fileName;
    private int ord;
    private String category;

    public void setOrd(int ord){
        this.ord= ord;
    }

}
