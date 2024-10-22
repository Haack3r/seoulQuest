package com.green.jaeyoon.goodmorning.repository;

import com.green.jaeyoon.goodmorning.domain.Todo;
import com.green.jaeyoon.goodmorning.vo.WriterVO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.*;

@SpringBootTest
@Log4j2
public class TodoRepositoryTests {

    @Autowired
    private TodoRepository repository;

    @Test
    public void test1() {
        log.info(repository);
        log.info("-----------------");
    }

    //p91
    @Test
    public void test2() {
        for (int i = 1; i <= 100; i++) {
            Todo todo = Todo.builder()
                    .title("Title.." + i)
                    .dueDate(LocalDate.of(2023, 12, 31))
                    .writer("user0" + i)
                    .build();
            repository.save(todo);
        }
    }

    @Test
    public void test3() {
        List<WriterVO> list = new ArrayList<>();
        repository.findAll().forEach(i -> {
            WriterVO vo = new WriterVO();
            if(i.getWriter().contains("7")) vo.setName(i.getWriter());
            if(i.getTitle().contains("7")) vo.setT(i.getTitle());
            list.add(vo);
        });
        for(WriterVO vo : list) {
            System.out.println(vo);
        }
    }

    @Test
    public void test4() {
        repository.findAll().forEach(i -> {
            int changeNum = i.getWriter().length();
            System.out.println(changeNum);
            int lastNum = Integer.parseInt(i.getWriter().substring(changeNum -1));
            if (lastNum % 2 == 0) {
                Todo todo = Todo.builder()
                        .tno(i.getTno())
                        .complete(true)
                        .dueDate(i.getDueDate())
                        .title(i.getTitle())
                        .writer(i.getWriter())
                        .build();
                repository.save(todo);
            }
        });
    }

    @Test
    public void test5() {
        repository.findAll().forEach(i -> {
            Long tno = i.getTno();
            Optional<Todo> result = repository.findById(tno);
            System.out.println(result.get().getTno());
        });
    }


    @Test
    public void testModify() {
        Long tno = 22l;
        Optional<Todo> result = repository.findById(tno);
        Todo vo = result.orElseThrow();     // 값이 있으면 vo에 저장하고, 없으면 예외 처리
        vo.changeTitle("수정했어요. 9월 5일");
        vo.changeComplete(true);
        vo.changeDueDate(LocalDate.of(2024,9,5));
        repository.save(vo);
    }

    // complete가 ture인 것을 찾아 수정
    @Test
    public void completeModify() {
        repository.findAll().stream().map(i -> {
            Long tno = i.getTno();
            Optional<Todo> result = repository.findById(tno);
            return result.orElseThrow();
        }).filter(j -> j.isComplete() == true).forEach(v -> {
            v.changeTitle("수정");
            repository.save(v);
        });
    }
    // stream 사용법 보완
    // 1. map과 filter 모두 반복을 내포하므로 해당 문제의 경우 중복해서 사용할 필요 없음.
    // 2. boolean 타입의 getter인 is~()과 filter를 함께 사용하는 경우 조건이 true인 stream만 반환
    //      따라서 == true 라는 조건을 붙일 필요 없음
    @Test
    public void completeModify2() {
        repository.findAll().stream().filter(i -> i.isComplete()).forEach(v -> {
            v.changeTitle("수정2");
            repository.save(v);
        });
    }

    //p96
    @Test
    public void testDelete2() {
        Long tno = 100l;
        repository.deleteById(tno);
    }
    @Test
    public void delete() {
        repository.findAll().stream().filter(i -> i.getWriter().length() % 3 == 0).forEach(i -> repository.deleteById(i.getTno()));
    }

}
