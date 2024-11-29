package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.ContactRequestDTO;
import com.positive.culture.seoulQuest.dto.ContactResponseDTO;
import com.positive.culture.seoulQuest.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/contact")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminContactController {



    private final ContactService contactService;

    @GetMapping("/list")
    public ResponseEntity<List<ContactResponseDTO>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    @PutMapping("/{id}/reply")
    public ResponseEntity<ContactResponseDTO> updateReply(
            @PathVariable Long id,
            @RequestBody String reply) {
        return ResponseEntity.ok(contactService.updateReply(id, reply));
    }

    @PutMapping("/{id}/temp-reply")
    public ResponseEntity<ContactResponseDTO> saveTempReply(
            @PathVariable Long id,
            @RequestBody String tempReply) {
        return ResponseEntity.ok(contactService.saveTempReply(id, tempReply));
    }
}