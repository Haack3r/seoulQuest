package com.positive.culture.seoulQuest.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberRole {
    USER("ROLE_USER", "유저"),
    ADMIN("ROLE_ADMIN", "관리자"); // 숫자 (USER = 0, ADMIN = 1)

    private final String key;
    private final String title;
}
