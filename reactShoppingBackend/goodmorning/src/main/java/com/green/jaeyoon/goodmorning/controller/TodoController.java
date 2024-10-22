package com.green.jaeyoon.goodmorning.controller;

import com.green.jaeyoon.goodmorning.dto.PageRequestDTO;
import com.green.jaeyoon.goodmorning.dto.PageResponseDTO;
import com.green.jaeyoon.goodmorning.dto.TodoDTO;
import com.green.jaeyoon.goodmorning.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/todo")
public class TodoController {
    private final TodoService service;

    @GetMapping("/{tno}")
    public TodoDTO get(@PathVariable(name = "tno") Long tno) {
        System.out.println("컨트롤러 데이터 하나 조회 : " + tno);
        return service.get(tno);
    }

    @GetMapping("/list")
    public PageResponseDTO<TodoDTO> list(PageRequestDTO dto) {
        System.out.println("컨트롤러 페이지 단위로 데이터 전체 조회 : " + dto);
        return service.list(dto);
    }

    @PostMapping("/")
    public Map<String, Long> register(@RequestBody TodoDTO dto) {
        log.info("컨트롤러 post 등록 : " + dto);
        Long tno = service.register(dto);
        return Map.of("tno", tno);
    }

    @PutMapping("/{tno}")
    public Map<String, String> modify(
        @PathVariable(name = "tno") Long tno,
        @RequestBody TodoDTO dto) {
                dto.setTno(tno);
                log.info("수정 컨트롤러 : " + dto);
                service.modify(dto);
                return Map.of("result", "success");
        }

    @DeleteMapping("/{tno}")
    public Map<String, String> delete(@PathVariable(name = "tno") Long tno) {
        log.info("컨트롤러에서 삭제 : " + tno);
        service.remove(tno);
        return Map.of("result", "success");
    }
}
