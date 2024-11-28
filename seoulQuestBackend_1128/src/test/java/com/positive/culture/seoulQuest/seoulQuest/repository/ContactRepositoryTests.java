package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Contact;
import com.positive.culture.seoulQuest.repository.ContactRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)  // 테스트 메서드 실행 순서 지정
class ContactRepositoryTests {

    @Autowired
    private ContactRepository contactRepository;

    private static Long savedId;

    @Test
    @Order(1)
    @DisplayName("문의 저장 테스트")
    void saveTest() {
        // given
        Contact contact = Contact.builder()
                .name("테스트")
                .email("test@example.com")
                .inquiry("문의 테스트입니다.")
                .build();

        // when
        Contact savedContact = contactRepository.save(contact);
        savedId = savedContact.getId();

        // then
        System.out.println("✅ 문의 저장 결과:");
        System.out.println("📝 ID: " + savedContact.getId());
        System.out.println("📝 이름: " + savedContact.getName());
        System.out.println("📝 상태: " + savedContact.getStatus());
        System.out.println("✅ 문의가 성공적으로 저장되었습니다.");
    }

    @Test
    @Order(2)
    @DisplayName("문의 목록 조회 테스트")
    void findAllTest() {
        // given
        for(int i = 1; i <= 3; i++) {
            Contact contact = Contact.builder()
                    .name("테스트" + i)
                    .email("test" + i + "@example.com")
                    .inquiry("문의 테스트 " + i + "입니다.")
                    .build();
            contactRepository.save(contact);
        }

        // when
        List<Contact> contacts = contactRepository.findAllByOrderByCreatedAtDesc();

        // then
        System.out.println("✅ 문의 목록 조회 결과:");
        System.out.println("📊 총 문의 수: " + contacts.size());
        contacts.forEach(contact -> {
            System.out.println("-------------------");
            System.out.println("📝 이름: " + contact.getName());
            System.out.println("📝 이메일: " + contact.getEmail());
            System.out.println("📝 문의내용: " + contact.getInquiry());
        });
    }

    @Test
    @Order(3)
    @DisplayName("문의 상태별 조회 테스트")
    void findByStatusTest() {
        // given
        Contact contact1 = Contact.builder()
                .name("처리완료테스트")
                .email("complete@example.com")
                .inquiry("처리완료 테스트입니다.")
                .build();
        contact1.setReply("답변완료");

        Contact contact2 = Contact.builder()
                .name("미처리테스트")
                .email("pending@example.com")
                .inquiry("미처리 테스트입니다.")
                .build();

        contactRepository.save(contact1);
        contactRepository.save(contact2);

        // when
        List<Contact> completedContacts = contactRepository.findByStatusOrderByCreatedAtDesc("처리완료");
        List<Contact> pendingContacts = contactRepository.findByStatusOrderByCreatedAtDesc("미처리");

        // then
        System.out.println("✅ 상태별 문의 조회 결과:");
        System.out.println("📊 처리완료 문의: " + completedContacts.size() + "건");
        System.out.println("📊 미처리 문의: " + pendingContacts.size() + "건");
    }

    @Test
    @Order(4)
    @DisplayName("문의 수정 테스트")
    void updateTest() {
        // given
        Contact contact = Contact.builder()
                .name("수정테스트")
                .email("update@example.com")
                .inquiry("수정 테스트입니다.")
                .build();
        Contact savedContact = contactRepository.save(contact);

        // when
        String replyText = "답변 테스트입니다.";
        savedContact.setReply(replyText);  // updateReply -> setReply로 변경
        Contact updatedContact = contactRepository.save(savedContact); // 변경사항 저장

        // then
        System.out.println("✅ 문의 답변 업데이트 결과:");
        System.out.println("📝 답변 내용: " + updatedContact.getReply());
        System.out.println("📝 처리 상태: " + updatedContact.getStatus());
    }

    @Test
    @Order(5)
    @DisplayName("임시 답변 저장 테스트")
    void saveTempReplyTest() {
        // given
        Contact contact = Contact.builder()
                .name("임시저장테스트")
                .email("temp@example.com")
                .inquiry("임시저장 테스트입니다.")
                .build();
        Contact savedContact = contactRepository.save(contact);

        // when
        String tempReplyText = "임시 답변입니다.";
        savedContact.setTempReply(tempReplyText);  // updateTempReply -> setTempReply로 변경
        Contact updatedContact = contactRepository.save(savedContact); // 변경사항 저장

        // then
        System.out.println("✅ 임시 답변 저장 결과:");
        System.out.println("📝 임시 답변: " + updatedContact.getTempReply());
        System.out.println("📝 처리 상태: " + updatedContact.getStatus());
    }

    @Test
    @Order(6)
    @DisplayName("문의 삭제 테스트")
    void deleteTest() {
        // given
        Contact contact = Contact.builder()
                .name("삭제테스트")
                .email("delete@example.com")
                .inquiry("삭제 테스트입니다.")
                .build();
        Contact savedContact = contactRepository.save(contact);

        // when
        contactRepository.delete(savedContact);
        Optional<Contact> deletedContact = contactRepository.findById(savedContact.getId());

        // then
        System.out.println("✅ 문의 삭제 결과:");
        System.out.println("📝 삭제된 문의 조회 결과: " + (deletedContact.isEmpty() ? "삭제됨" : "삭제 실패"));
    }

    @AfterEach
    void printTestResult() {
        System.out.println("--------------------");
    }
}