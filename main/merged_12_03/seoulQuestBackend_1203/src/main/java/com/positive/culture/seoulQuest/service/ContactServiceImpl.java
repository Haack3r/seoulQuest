package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Contact;
import com.positive.culture.seoulQuest.dto.ContactRequestDTO;
import com.positive.culture.seoulQuest.dto.ContactResponseDTO;
import com.positive.culture.seoulQuest.repository.ContactRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService{

    private final ContactRepository contactRepository;

    @Override
    @Transactional
    public ContactResponseDTO createContact(ContactRequestDTO requestDTO) {
        Contact contact = Contact.builder()
                .name(requestDTO.getName())
                .email(requestDTO.getEmail())
                .inquiry(requestDTO.getInquiry())
                .build();

        Contact savedContact = contactRepository.save(contact);
        return convertToDTO(savedContact);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactResponseDTO> getAllContacts() {
        return contactRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContactResponseDTO updateReply(Long id, String reply) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid contact Id:" + id));

        System.out.println("Before update - Status: " + contact.getStatus()); // 디버깅
        System.out.println("Before update - Reply: " + contact.getReply()); // 디버깅

        if (reply != null && !reply.trim().isEmpty()) {
            contact.setReply(reply.trim());
            contact.setStatus("처리완료");
            contact = contactRepository.saveAndFlush(contact);  // 즉시 저장 및 동기화
        }

        System.out.println("After update - Status: " + contact.getStatus()); // 디버깅
        System.out.println("After update - Reply: " + contact.getReply()); // 디버깅

        return convertToDTO(contact);
    }

    @Override
    @Transactional
    public ContactResponseDTO saveTempReply(Long id, String tempReply) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid contact Id:" + id));

        if (tempReply != null && !tempReply.trim().isEmpty()) {
            contact.setTempReply(tempReply.trim());
            contact.setStatus(Contact.STATUS_IN_PROGRESS);  // 상태를 '처리중'으로 변경
            contact = contactRepository.saveAndFlush(contact);
        }

        return convertToDTO(contact);
    }

    // Entity를 DTO로 변환하는 private 메서드
    private ContactResponseDTO convertToDTO(Contact contact) {
        return ContactResponseDTO.builder()
                .id(contact.getId())
                .name(contact.getName())
                .email(contact.getEmail())
                .inquiry(contact.getInquiry())
                .reply(contact.getReply())
                .tempReply(contact.getTempReply())
                .status(contact.getStatus())
                .createdAt(contact.getCreatedAt())
                .updatedAt(contact.getUpdatedAt())
                .build();
    }
}
