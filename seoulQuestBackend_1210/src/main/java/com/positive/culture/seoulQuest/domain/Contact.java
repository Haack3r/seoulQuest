package com.positive.culture.seoulQuest.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
@Table(name = "tbl_contact")
public class Contact {
    // 상태 상수 추가
    public static final String STATUS_PENDING = "미처리";
    public static final String STATUS_IN_PROGRESS = "처리중";
    public static final String STATUS_COMPLETED = "처리완료";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 200)
    private String email;

    @Column(nullable = false, length = 1000)
    private String inquiry;

    @Column(length = 1000)
    private String reply;

    @Column(length = 1000)
    private String tempReply;

    @Builder.Default
    @Column(nullable = false)
    private String status = STATUS_PENDING;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(updatable = true)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = STATUS_PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // 답변 업데이트 메소드
    public void setReply(String reply) {
        System.out.println("Setting reply: " + reply); // 디버깅
        if (reply != null && !reply.trim().isEmpty()) {
            this.reply = reply.trim();
            this.status = STATUS_COMPLETED;  // 상태를 '처리완료'로 변경
            this.updatedAt = LocalDateTime.now();
        }
    }

    // 임시 답변 업데이트 메소드
    public void setTempReply(String tempReply) {
        if (tempReply != null && !tempReply.trim().isEmpty()) {
            this.tempReply = tempReply.trim();
            this.status = STATUS_IN_PROGRESS;  // 상태를 '처리중'으로 변경
            this.updatedAt = LocalDateTime.now();
        }
    }

    // 상태 업데이트 메소드
    public void setStatus(String status) {
        if (status != null && !status.trim().isEmpty()) {
            this.status = status.trim();
            this.updatedAt = LocalDateTime.now();
        }
    }
}