package com.green.jaeyoon.goodmorning.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tbl_todo")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Todo {
    @Id  // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tno;
    private String title;
    private String writer;
    private boolean complete;
    private LocalDate dueDate;

    // p94
    public void changeTitle(String title) {this.title = title;}
    public void changeComplete(boolean complete) {this.complete = complete;}
    public void changeDueDate(LocalDate dueDate) {this.dueDate = dueDate;}
}
