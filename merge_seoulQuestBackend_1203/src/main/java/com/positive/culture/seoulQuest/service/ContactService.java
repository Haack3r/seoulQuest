package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.dto.ContactRequestDTO;
import com.positive.culture.seoulQuest.dto.ContactResponseDTO;


import java.util.List;

public interface ContactService {
    // 문의 생성
    ContactResponseDTO createContact(ContactRequestDTO requestDTO);

    // 모든 문의 조회
    List<ContactResponseDTO> getAllContacts();

    // 답변 업데이트
    ContactResponseDTO updateReply(Long id, String reply);

    // 임시 답변 저장
    ContactResponseDTO saveTempReply(Long id, String tempReply);
}
