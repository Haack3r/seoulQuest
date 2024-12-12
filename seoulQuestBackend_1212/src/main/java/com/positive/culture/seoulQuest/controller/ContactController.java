package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.ContactRequestDTO;
import com.positive.culture.seoulQuest.dto.ContactResponseDTO;
import com.positive.culture.seoulQuest.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/add")
    public ResponseEntity<ContactResponseDTO> createContact(@RequestBody ContactRequestDTO requestDTO) {
        return ResponseEntity.ok(contactService.createContact(requestDTO));
    }

    @GetMapping("/list")
    public ResponseEntity<List<ContactResponseDTO>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    @PutMapping("/{id}/reply")
    public ResponseEntity<ContactResponseDTO> updateReply(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String reply = request.get("reply");
        System.out.println("Received reply in controller: " + reply); // 디버깅

        ContactResponseDTO response = contactService.updateReply(id, reply);
        System.out.println("Response DTO - Status: " + response.getStatus()); // 디버깅
        System.out.println("Response DTO - Reply: " + response.getReply()); // 디버깅

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/temp-reply")
    public ResponseEntity<ContactResponseDTO> saveTempReply(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String tempReply = request.get("tempReply");
        System.out.println("Received temp reply in controller: " + tempReply); // 디버깅
        return ResponseEntity.ok(contactService.saveTempReply(id, tempReply));
    }
}