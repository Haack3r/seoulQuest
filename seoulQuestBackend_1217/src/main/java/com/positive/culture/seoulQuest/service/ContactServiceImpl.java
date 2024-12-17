package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Contact;
import com.positive.culture.seoulQuest.dto.ContactRequestDTO;
import com.positive.culture.seoulQuest.dto.ContactResponseDTO;
import com.positive.culture.seoulQuest.repository.ContactRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final JavaMailSender mailSender;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.name}")
    private String adminName;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Override
    @Transactional
    public ContactResponseDTO createContact(ContactRequestDTO requestDTO) {
        Contact contact = Contact.builder()
                .name(requestDTO.getName())
                .email(requestDTO.getEmail())
                .inquiry(requestDTO.getInquiry())
                .build();

        Contact savedContact = contactRepository.save(contact);

        try {
            sendConfirmationEmail(savedContact);
            sendAdminNotificationEmail(savedContact);
        } catch (MessagingException e) {
            log.error("이메일 발송 실패", e);
        }
        return convertToDTO(savedContact);
    }

    private void sendConfirmationEmail(Contact contact) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(contact.getEmail());
        helper.setFrom(String.format("%s <%s>", adminName, adminEmail));
        helper.setSubject("[Seoulhwa] 문의가 접수되었습니다");

        String emailContent = String.format(
                "%s님,\n\n" +
                        "문의해 주셔서 감사합니다.\n" +
                        "귀하의 문의가 정상적으로 접수되었습니다.\n\n" +
                        "※문의 내용※\n%s\n\n" +
                        "최대한 빠른 시일 내에 답변 드리도록 하겠습니다.\n" +
                        "감사합니다.",
                contact.getName(),
                contact.getInquiry()
        );

        helper.setText(emailContent, false);
        mailSender.send(message);
        log.info("확인 이메일 발송 완료: {}", contact.getEmail());
    }

    private void sendAdminNotificationEmail(Contact contact) throws MessagingException {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(adminEmail);
            helper.setFrom(String.format("%s <%s>", contact.getName(), contact.getEmail()));
            helper.setSubject("[새로운 문의] " + contact.getName() + "님의 문의");

            String emailContent = String.format(
                    "새로운 문의가 접수되었습니다.\n\n" +
                            "※문의자 정보※\n" +
                            "이름: %s\n" +
                            "이메일: %s\n\n" +
                            "문의 내용:\n%s",
                    contact.getName(),
                    contact.getEmail(),
                    contact.getInquiry()
            );

            helper.setText(emailContent, false);
            mailSender.send(message);
            log.info("관리자 알림 이메일 발송 완료: {}", adminEmail);
        } catch (MessagingException e) {
            log.error("관리자 알림 이메일 발송 실패: {}", e.getMessage());
            throw e;
        }
    }

    private void sendReplyCompletionEmail(Contact contact) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(contact.getEmail());
        helper.setFrom(String.format("%s <%s>", adminName, adminEmail));
        helper.setSubject("[SeoulCultureQuest] 문의하신 내용에 대한 답변이 등록되었습니다");

        String emailContent = String.format(
                "%s님,\n\n" +
                        "문의하신 내용에 대한 답변이 등록되었습니다.\n\n" +
                        "▶ 문의 내용\n%s\n\n" +
                        "▶ 답변 내용\n%s\n\n" +
                        "추가 문의사항이 있으시다면 언제든 문의해 주시기 바랍니다.\n" +
                        "감사합니다.\n\n" +
                        "SeoulCultureQuest 드림",
                contact.getName(),
                contact.getInquiry(),
                contact.getReply()
        );

        helper.setText(emailContent, false);
        mailSender.send(message);
        log.info("답변 완료 이메일 발송 완료: {}", contact.getEmail());
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

        System.out.println("Before update - Status: " + contact.getStatus());
        System.out.println("Before update - Reply: " + contact.getReply());

        if (reply != null && !reply.trim().isEmpty()) {
            contact.setReply(reply.trim());
            contact.setStatus("처리완료");
            contact = contactRepository.saveAndFlush(contact);

            // 답변 완료 시 사용자에게 이메일 발송
            try {
                sendReplyCompletionEmail(contact);
            } catch (MessagingException e) {
                log.error("답변 완료 이메일 발송 실패", e);
            }
        }

        System.out.println("After update - Status: " + contact.getStatus());
        System.out.println("After update - Reply: " + contact.getReply());

        return convertToDTO(contact);
    }

    @Override
    @Transactional
    public ContactResponseDTO saveTempReply(Long id, String tempReply) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid contact Id:" + id));

        if (tempReply != null && !tempReply.trim().isEmpty()) {
            contact.setTempReply(tempReply.trim());
            contact.setStatus(Contact.STATUS_IN_PROGRESS);
            contact = contactRepository.saveAndFlush(contact);
        }

        return convertToDTO(contact);
    }

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