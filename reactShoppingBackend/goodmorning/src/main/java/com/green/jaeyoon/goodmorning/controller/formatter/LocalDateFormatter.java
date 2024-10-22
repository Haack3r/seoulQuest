package com.green.jaeyoon.goodmorning.controller.formatter;

import org.springframework.format.Formatter;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

//스프링 MVC의 동작과정에서 사용될 수 있도록 설정 추가. config 페이지내에 클레스 추가
//스프링에서는 xml로 작성하거나, java코드로 작성하는 두 가지 경우 있음. 지금은 자바로 작성중
public class LocalDateFormatter implements Formatter<LocalDate> {
    @Override
    public LocalDate parse(String text, Locale locale) throws ParseException {
        return LocalDate.parse(text, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    @Override
    public String print(LocalDate object, Locale locale) {
        return DateTimeFormatter.ofPattern("yyyy-MM-dd").format(object);
    }
}
