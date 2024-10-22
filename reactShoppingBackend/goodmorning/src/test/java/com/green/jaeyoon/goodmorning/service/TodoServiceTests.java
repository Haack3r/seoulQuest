package com.green.jaeyoon.goodmorning.service;

import com.green.jaeyoon.goodmorning.domain.Todo;
import com.green.jaeyoon.goodmorning.dto.PageRequestDTO;
import com.green.jaeyoon.goodmorning.dto.PageResponseDTO;
import com.green.jaeyoon.goodmorning.dto.TodoDTO;
import com.green.jaeyoon.goodmorning.repository.TodoRepository;
import com.green.jaeyoon.goodmorning.vo.WriterVO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@Log4j2
public class TodoServiceTests {

    @Autowired
    private TodoService service;

    @Test
    public void testRegister() {
        TodoDTO dto = TodoDTO.builder()
                .title("서비스 테스트")
                .writer("서비스 작성자")
                .dueDate(LocalDate.of(2034, 2, 7))
                .build();
        Long tno = service.register(dto);
        log.info("tno" + tno);
    }

    @Test
    public void testGet() {
        Long tno = 23l;
        TodoDTO dto = service.get(tno);
        log.info("dto" + dto);
    }

    @Test
    public void testListWithPaging() {
        PageRequestDTO dto = PageRequestDTO.builder()
                .page(2)
                .size(10)
                .build();
        PageResponseDTO<TodoDTO> response = service.list(dto);
        log.info("response" + response);
    }

}
