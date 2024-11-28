package com.positive.culture.seoulQuest.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class ContactRequestDTO {
    private String name;
    private String email;
    private String inquiry;
    private String reply;
    private String tempReply;
}
