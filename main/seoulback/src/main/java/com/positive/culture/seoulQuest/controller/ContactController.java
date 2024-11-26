package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.ContactRequestDTO;
import com.positive.culture.seoulQuest.dto.ContactResponseDTO;
import com.positive.culture.seoulQuest.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/add")
    public ResponseEntity<ContactResponseDTO> createContact(@RequestBody ContactRequestDTO requestDTO) {
        return ResponseEntity.ok(contactService.createContact(requestDTO));
    }

//    @GetMapping("/list")
//    public ResponseEntity<List<ContactResponseDTO>> getAllContacts() {
//        return ResponseEntity.ok(contactService.getAllContacts());
//    }

//    @PutMapping("/{id}/reply")
//    public ResponseEntity<ContactResponseDTO> updateReply(
//            @PathVariable Long id,
//            @RequestBody String reply) {
//        return ResponseEntity.ok(contactService.updateReply(id, reply));
//    }
//
//    @PutMapping("/{id}/temp-reply")
//    public ResponseEntity<ContactResponseDTO> saveTempReply(
//            @PathVariable Long id,
//            @RequestBody String tempReply) {
//        return ResponseEntity.ok(contactService.saveTempReply(id, tempReply));
//    }
}