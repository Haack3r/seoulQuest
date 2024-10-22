package com.green.jaeyoon.goodmorning.service;

import com.green.jaeyoon.goodmorning.domain.Todo;
import com.green.jaeyoon.goodmorning.dto.PageRequestDTO;
import com.green.jaeyoon.goodmorning.dto.PageResponseDTO;
import com.green.jaeyoon.goodmorning.dto.TodoDTO;

public interface TodoService {
    Long register(TodoDTO dto);
    TodoDTO get(Long tno);

    //p111 페이징 처리
    PageResponseDTO<TodoDTO> list(PageRequestDTO request);

    public void modify(TodoDTO dto);
    public void remove(Long tno);
}
