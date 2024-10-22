package com.green.jaeyoon.goodmorning.service;

import com.green.jaeyoon.goodmorning.domain.Todo;
import com.green.jaeyoon.goodmorning.dto.PageRequestDTO;
import com.green.jaeyoon.goodmorning.dto.PageResponseDTO;
import com.green.jaeyoon.goodmorning.dto.TodoDTO;
import com.green.jaeyoon.goodmorning.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional  // 함수에서 하나라도 실행되지 않으면 동시에 실행되던지 여러개가 실행되지 않도록 함, 원자성(Atomic)
                // ex) 댓글 추가 중 오류가 발생하여 댓글은 추가되지 않았는데 댓글의 갯수만 증가? 이러면 안됨
@Log4j2
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{
    // 자동 주입(injection) 대상은 final로
    // DI(Dependency Injection) => 의존성 주입
    // 객체 생성은 스프링에서 생성하여 자동으로 주입해서 개발자가 관리하지 않아도 됨
    private final ModelMapper modelMapper;
    private final TodoRepository repository;

    @Override
    public Long register(TodoDTO dto) {
        log.info("service 등록...");
        Todo todo = modelMapper.map(dto, Todo.class);
        Todo savedTodo = repository.save(todo);
        return savedTodo.getTno();
    }

    @Override
    public TodoDTO get(Long tno) {
        log.info("서비스 데이터 하나 조회 :" + tno);
        Optional<Todo> result = repository.findById(tno);
        Todo todo = result.orElseThrow();
        TodoDTO dto = modelMapper.map(todo, TodoDTO.class);
        return dto;
    }

    @Override
    public PageResponseDTO<TodoDTO> list(PageRequestDTO dto) {
        System.out.println("서비스 전체 목록" + dto);  // url로 현재 page와 각 페이지당 몇개의 데이터(size)인지 정보가 담겨있다
        Pageable pageable = PageRequest.of(
                dto.getPage() - 1,  //1페이지가 0이므로
                dto.getSize(),
                Sort.by("tno").descending()

        );
        Page<Todo> result = repository.findAll(pageable);

        List<TodoDTO> dtoList = result.getContent().stream().map(todo -> modelMapper.map(todo, TodoDTO.class)).collect(Collectors.toList());
        long totalCount = result.getTotalElements();
        //PageResponseDTO를 setter를 통해 dto와 전체 데이터 갯수 (totalCount)
        //PageRequestDTO (page, size)를 자동으로 설정해서 나온다
        PageResponseDTO<TodoDTO> responseDTO = PageResponseDTO.<TodoDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(dto)
                .totalCount(totalCount)
                .build();
        return responseDTO;
    }

    @Override
    public void modify(TodoDTO dto) {
        log.info("서비스에서 수정 : " +dto);
        Optional<Todo>result = repository.findById(dto.getTno());
        Todo todo = result.orElseThrow();
        todo.changeTitle(dto.getTitle());
        todo.changeDueDate(dto.getDueDate());
        todo.changeComplete(dto.isComplete());
        repository.save(todo);
    }

    @Override
    public void remove(Long tno) {
        log.info("서비스에서 삭제 : " + tno);
        repository.deleteById(tno);
    }
}
