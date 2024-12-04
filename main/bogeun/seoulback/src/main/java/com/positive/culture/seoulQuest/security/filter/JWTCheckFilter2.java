//package com.positive.culture.seoulQuest.security.filter;
//
//import com.google.gson.Gson;
//import com.positive.culture.seoulQuest.dto.MemberDTO;
//import com.positive.culture.seoulQuest.util.JWTUtil;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//import java.io.PrintWriter;
//import java.util.List;
//import java.util.Map;
//
//@Log4j2
//
//public class JWTCheckFilter2 extends OncePerRequestFilter {
//
//    @Override
//    // Filter 로 체크하지 않을 경로나 메서드 지정
//    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        // OPTIONS 체크 안함
//        if (request.getMethod().equals("OPTIONS")) return true;
//
//        String path = request.getRequestURI();
//        log.info("check uri....."+path);
//
//        // api/member 경로의 호출은 체크 안함
//        if (path.startsWith("/api/member/")) return true;
//
//        if (path.startsWith("/api/products/"))
//            return true; // Do not apply this filter for these paths
//
//        if (path.startsWith("/api/products/view/**"))
//            return true;
//        if (path.startsWith("/api/products/{pno}}"))
//            return true;
//
//        if (path.startsWith("/api/tours/"))
//            return true; // Do not apply this filter for these paths
//
//        if (path.startsWith("/api/tours/view/**"))
//            return true;
//        if (path.startsWith("/api/tours/{pno}}"))
//            return true;
//
//        return false;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        log.info("----- JWTCheckFilter -----");
//
//        String authHeaderStr = request.getHeader("Authorization");
//
//        try{
//            // Bearer accessToken
//            String accessToken = authHeaderStr.substring(7);
//            Map<String, Object> claims = JWTUtil.validateToken(accessToken);
//
//            log.info("JWT claims : "+claims);
//
//            // p336
//            String email = (String) claims.get("email");
//            String password = (String) claims.get("password");
//            String nickname = (String) claims.get("nickname");
//            Boolean social = (Boolean) claims.get("social");
//            List<String> roleNames = (List<String>) claims.get("roleNames");
//            roleNames.forEach(System.out::println);
//            MemberDTO memberDTO = new MemberDTO(email, password, nickname, social.booleanValue(), roleNames);
//
//            log.info("----------");
//            log.info(memberDTO);
//            log.info(memberDTO.getAuthorities());
//
//            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password, memberDTO.getAuthorities());
//            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//
//            filterChain.doFilter(request, response);
//        } catch (Exception e) {
//            log.error("JWT Check Error......");
//            log.error(e.getMessage());
//
//            Gson gson = new Gson();
//            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
//
//            response.setContentType("application/json");
//            PrintWriter printWriter = response.getWriter();
//            printWriter.print(msg);
//            printWriter.close();
//        }
//    }
//}
