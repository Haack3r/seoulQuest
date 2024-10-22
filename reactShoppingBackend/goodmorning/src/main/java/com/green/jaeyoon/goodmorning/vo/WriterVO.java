package com.green.jaeyoon.goodmorning.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class WriterVO {
    // DB에서 전체 조회한 데이터 중 작성자는 name에 title은 t에 저장(List)
    // 문자열에 7을 포함하는 것만 골라담기
    private String name;
    private String t;
}
