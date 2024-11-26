package com.positive.culture.seoulQuest.advice;

//import com.positive.culture.seoulQuest.util.CustomJWTException;
import com.positive.culture.seoulQuest.util.CustomJWTException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class CustomControllerAdvice {

    //존재하지 않는 번호를 조회하면 NoSuchElementException 발생을 처리하기 위한 보조
    @ExceptionHandler (NoSuchElementException.class)
    protected ResponseEntity<?> notExist(NoSuchElementException e) {
        String message = e.getMessage();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", message));
    }

    // 페이지 번호를 숫자가 아닌 문자로 전달하면 MethodArgumentNotValidException 발생을 처리하기 위한 보조 (advice)
    @ExceptionHandler (MethodArgumentNotValidException.class)
    protected ResponseEntity<?> handleIllegalArgumentException(MethodArgumentNotValidException e) {
        String message = e.getMessage();
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("message", message));
    }

    //토큰 관련
    @ExceptionHandler (CustomJWTException.class)
    protected ResponseEntity<?> handleJWTException(CustomJWTException e) {
        String msg = e.getMessage();
        return ResponseEntity.ok().body(Map.of("error", msg));
    }
}