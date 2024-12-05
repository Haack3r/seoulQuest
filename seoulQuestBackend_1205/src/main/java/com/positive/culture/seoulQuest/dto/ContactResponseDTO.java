package com.positive.culture.seoulQuest.dto;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;


@Getter
@Builder
public class ContactResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String inquiry;
    private String reply;
    private String tempReply;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
