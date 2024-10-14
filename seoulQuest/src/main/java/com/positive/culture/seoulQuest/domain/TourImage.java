package com.positive.culture.seoulQuest.domain;
import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable //VO로써 Product엔티티에 @ElementCollection으로 매핑됨
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TourImage {
    private String fileName;
    private int ord;
    private String categoryName;

    public void setOrd(int ord){
        this.ord= ord;
    }

}
