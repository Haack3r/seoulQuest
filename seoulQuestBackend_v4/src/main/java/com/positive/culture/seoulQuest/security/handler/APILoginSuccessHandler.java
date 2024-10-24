package com.positive.culture.seoulQuest.security.handler;

import com.google.gson.Gson;
import com.positive.culture.seoulQuest.dto.MemberDTO;
import com.positive.culture.seoulQuest.util.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@Log4j2
public class APILoginSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 인증 성공 시 호출
        log.info("-----Success-----");
        log.info(authentication);
        log.info("-----------------");

        // p317
//        MemberDTO dto = (MemberDTO) authentication.getPrincipal();
//        Map<String, Object> claims = dto.getClaims();
//        String accessToken = JWTUtil.generateToken(claims, 10); // 10분
//        String refreshToken = JWTUtil.generateToken(claims, 60*24); // 24시간
//        claims.put("accessToken", accessToken);
//        claims.put("refreshToken", refreshToken);

// Assuming MemberDTO has a method to get role names
        MemberDTO dto = (MemberDTO) authentication.getPrincipal();
        Map<String, Object> claims = dto.getClaims();

// Extract role names from MemberDTO
        List<String> roleNames = dto.getRoleNames(); // Ensure this method exists in MemberDTO

// Generate access and refresh tokens with role names included
        String accessToken = JWTUtil.generateToken(claims, roleNames, 10); // 10 minutes
        String refreshToken = JWTUtil.generateToken(claims, roleNames, 60 * 24); // 24 hours

// Add tokens to claims if necessary
        claims.put("accessToken", accessToken);
        claims.put("refreshToken", refreshToken);

        Gson gson = new Gson();
        String json = gson.toJson(claims);
        response.setContentType("application/json; charset=utf-8");
        PrintWriter printWriter = response.getWriter();
        printWriter.println(json);
        printWriter.close();
    }
}
