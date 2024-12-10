package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Address;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.MemberRole;
import com.positive.culture.seoulQuest.dto.CustomerListDTO;
import com.positive.culture.seoulQuest.dto.MemberDTO;
import com.positive.culture.seoulQuest.dto.MemberModifyDTO;
import com.positive.culture.seoulQuest.dto.UserDTO;
import com.positive.culture.seoulQuest.repository.MemberRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Value("${admin.name}")
    private String adminName;

    //구글 정책상 admin email을 지정해도 spring.mail.username 으로 사용됨.
    @Value("${spring.mail.username}")
    private String mailUsername;

    @Override
    public MemberDTO getKakaoMember(String accessToken) {
        String email = getEmailFromKakaoAccessToken(accessToken);
        log.info("email: " + email);
        Optional<Member> result = memberRepository.findByEmail(email);

        if (result.isPresent()) {
            MemberDTO memberDTO = entityToDTO(result.get());
            return memberDTO;
        }
        Member socialMember = makeSocialMember(email);
        memberRepository.save(socialMember);
        MemberDTO memberDTO = entityToDTO(socialMember);
        return memberDTO;
    }

    @Override
    public void modifyMember(MemberModifyDTO memberModifyDTO) {
        Optional<Member> result = memberRepository.findByEmail(memberModifyDTO.getEmail());
        Member member = result.orElseThrow();
        member.changePw(passwordEncoder.encode(memberModifyDTO.getPw()));
        member.changeSocial(false);
        member.changeNick(memberModifyDTO.getNickname());

        memberRepository.save(member);
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        System.out.println("서비스  email:" + email);

        return memberRepository.findByEmail(email);
    }

    @Override
    public UserDTO findByEmailforUserInfo(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        UserDTO userDTO = entityToUserDTOforMypage(member);
        return userDTO;
    }

    @Override
    public Optional<Member> findByNickname(String nickName) {
        System.out.println("서비스  nickname:" + nickName);
        return memberRepository.findByNickName(nickName);
    }

    @Override
    public Member save(UserDTO dto) {

        // Assemble phone number, handling any missing parts
        String phoneNumber = String.join("-",
                dto.getPhoneNumber1(),
                dto.getPhoneNumber2(),
                dto.getPhoneNumber3());

        // Create a new Member instance
        Member member = Member.builder()
                .firstname(dto.getFirstname())
                .lastname(dto.getLastname())
                .nickName(dto.getNickName())
                .email(dto.getEmail())
                .phoneNumber(phoneNumber.trim())
                .birthday(dto.getBirthday()) // Default to today if missing
                .address(new Address(
                        dto.getStreet(),
                        dto.getCity(),
                        dto.getState(),
                        dto.getZipcode(),
                        dto.getCountry()))
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();

        member.addRole(MemberRole.USER);

        return memberRepository.save(member);
    }

    // userDTO받아서 member(entity)로 변환하고 repository저장
    @Override
    public void modifyInfo(UserDTO dto) {

        String email = dto.getEmail();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        String phoneNumber = String.join("-",
                dto.getPhoneNumber1(),
                dto.getPhoneNumber2(),
                dto.getPhoneNumber3());

        member.changeNick(dto.getNickName());
        member.changePhone(phoneNumber);
        member.changeAddress(new Address(
                dto.getStreet(),
                dto.getCity(),
                dto.getState(),
                dto.getZipcode(),
                dto.getCountry()));
        member.changePw(passwordEncoder.encode(dto.getPassword()));

        memberRepository.save(member);

    }

    @Override
//    public UserDTO findPasswordAndSendEmail(UserDTO userDTO) {
    public UserDTO findPasswordAndSendEmail(UserDTO userDTO) {
        String email = userDTO.getEmail();
        String phoneNumber = String.join("-",
                userDTO.getPhoneNumber1(),
                userDTO.getPhoneNumber2(),
                userDTO.getPhoneNumber3()
        );

        Member member = memberRepository.findByEmailAndPhoneNumber(email, phoneNumber).orElseThrow();

        // 1. 임시 비밀번호 생성
        String tempPassword = makeTempPassword();

        // 2. 임시 비밀번호 저장
        member.changePw(passwordEncoder.encode(tempPassword));
        memberRepository.save(member);

        // 3. 이메일 발송
        sendTemporaryPasswordEmail(member.getEmail(), tempPassword);

        UserDTO newUserDTO = entityToUserDTOforMypage(member);

        return newUserDTO;
    }

    @Override
    public UserDTO findEmail(UserDTO userDTO) {
        String firstname= userDTO.getFirstname();
        String lastname = userDTO.getLastname();

        String phoneNumber = String.join("-",
                userDTO.getPhoneNumber1(),
                userDTO.getPhoneNumber2(),
                userDTO.getPhoneNumber3()
        );

        Member member = memberRepository.findByFirstnameAndLastnameAndPhoneNumber(firstname, lastname, phoneNumber)
                .orElseThrow();
        log.info(member);

        UserDTO newUserDTO = entityToUserDTOforMypage(member);

        return newUserDTO;
    }

    private void sendTemporaryPasswordEmail(String toEmail, String tempPassword) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setFrom(String.format("%s <%s>", adminName, mailUsername));
            helper.setSubject("Your Temporary Password");
            // HTML 형식으로 이메일 내용 작성
            String emailContent = String.format(
                    "Hello,<br><br>Your temporary password is: <b>%s</b><br><br>Please change it after logging in.",
                    tempPassword
            );

            helper.setText(emailContent, true); // HTML 형식으로 설정

            mailSender.send(message);
            log.info("Temporary password email sent to: " + toEmail);
        } catch (MessagingException e) {
            log.error("Failed to send email", e);
            throw new RuntimeException("Failed to send temporary password email", e);
        }
    }

    // 임시 비밀번호 발급시 사용함.
    private String makeTempPassword() {
        StringBuffer buffer = new StringBuffer();

        for (int i = 0; i < 10; i++) {
            buffer.append((char) ((int) (Math.random() * 55) + 65));
        }
        return buffer.toString();
    }

    private String getEmailFromKakaoAccessToken(String accessToken) {
        String KakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

        if (accessToken == null) {
            throw new RuntimeException("Access token is null");
        }
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(KakaoGetUserURL).build();

        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(
                uriBuilder.toString(),
                HttpMethod.GET,
                entity,
                LinkedHashMap.class);
        log.info(response);

        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();

        log.info("---------------------");
        log.info(bodyMap);

        LinkedHashMap<String, String> kakaoAccount = bodyMap.get("kakao_account");

        log.info("KakaoAccount: " + kakaoAccount);
        return kakaoAccount.get("email");

    }

    private Member makeSocialMember(String email) {
        String tempPassword = makeTempPassword();
        log.info("tempPassword: " + tempPassword);
        String nickname = "소셜회원";
        Member member = Member.builder()
                .email(email)
                .password(passwordEncoder.encode(tempPassword))
                .nickName(nickname)
                .social(true)
                .build();

        member.addRole(MemberRole.USER);
        return member;
    }

    @Override
    public List<MemberDTO> getAllMembers() {
        // Fetch all members from the repository
        List<Member> members = memberRepository.findAll();

        // Convert the list of Member entities to MemberDTOs
        return members.stream()
                .map(this::entityToDTO)  // Using the entityToDTO method to convert each member
                .collect(Collectors.toList());
    }

    @Override
    public List<CustomerListDTO> getAllCustomers() {
        return memberRepository.findAll().stream()
                .map(this::memberToCustomerDTO)
                .collect(Collectors.toList());
    }

}
