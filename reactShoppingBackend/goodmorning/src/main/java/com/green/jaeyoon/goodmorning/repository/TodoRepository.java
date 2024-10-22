package com.green.jaeyoon.goodmorning.repository;

import com.green.jaeyoon.goodmorning.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    // JpaRepository<엔터티 이름, primary key의 데이터 타입>
}
