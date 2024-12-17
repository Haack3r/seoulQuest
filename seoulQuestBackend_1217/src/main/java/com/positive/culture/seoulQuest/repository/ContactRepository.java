package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findAllByOrderByCreatedAtDesc();
    List<Contact> findByStatusOrderByCreatedAtDesc(String status);
}