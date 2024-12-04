package com.positive.culture.seoulQuest.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResponseDTO<E> { //타입에 상관없이 활용할수 있도록 제너럴 타입 사용

    private List<E> dtoList; // Element, generalization 사용자가 보내는 것에 따라 형식이 달라짐
    private List<Integer> pageNumList; // 각 페이지 묶음을 담고있는 리스트
    private PageRequestDTO pageRequestDTO;
    private boolean prev, next; // 현재 페이지를 기준으로 이전, 이후 페이지가 있는지 여부 저장
    private int totalCount, prevPage, nextPage, totalPage, current;

    //가독성, 유지보수성을 위해 커스텀 빌더 메서드로 생성자를 구현함
    @Builder(builderMethodName = "withAll")
    public PageResponseDTO(List<E> dtoList, PageRequestDTO pageRequestDTO, long totalCount) {
        this.dtoList = dtoList;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = (int)totalCount;

        int end = (int)(Math.ceil(pageRequestDTO.getPage()/10.0)) * 10;
        int start = end - 9;    // 현재 페이지가 10으로 지정되어 있으므로 첫페이지는 -9
        int last = (int)(Math.ceil((totalCount/(double)pageRequestDTO.getSize())));
        end = end > last? last : end;
        this.prev = start > 1;
        this.next = totalCount > end * pageRequestDTO.getSize();
        this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());
        if(prev) this.prevPage = start - 1;
        if(next) this.nextPage = end + 1;
        this.totalPage = this.pageNumList.size();
        this.current = pageRequestDTO.getPage();
    }
}
