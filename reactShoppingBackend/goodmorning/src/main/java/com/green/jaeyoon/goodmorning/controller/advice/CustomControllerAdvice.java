package com.green.jaeyoon.goodmorning.controller.advice;

import com.green.jaeyoon.goodmorning.util.CustomJWTException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class CustomControllerAdvice {

    @ExceptionHandler (NoSuchElementException.class)
    protected ResponseEntity<?> notExist(NoSuchElementException e) {
        String message = e.getMessage();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", message));
    }

    // p116 페이지 번호가 숫자가 아닌 문자로 전달하면 MethodArgumentNotValidException 발생을 처리하기 위한 보조 (advice)
    // 예외 처리는 @ExceptionHandler를 이용하여 특정한 타입의 예외가 발생하면 이에 대한 결과 데이터를 만들어내는 방식으로 작성
    // @RestControllerAdvice가 적용되면 예외가 발생해도 호출한 쪽으로 HTTP 상태 코드와 JSON 메시지를 전달할 수 있다
    @ExceptionHandler (MethodArgumentNotValidException.class)
    protected ResponseEntity<?> handleIllegalArgumentException(MethodArgumentNotValidException e) {
        String message = e.getMessage();
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("message", message));
    }

    @ExceptionHandler (CustomJWTException.class)
    protected ResponseEntity<?> handleJWTException(CustomJWTException e) {
        String message = e.getMessage();
        return ResponseEntity.ok().body(Map.of("error", message));
    }
}
