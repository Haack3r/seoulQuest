package com.positive.culture.seoulQuest.config;

//import com.positive.culture.seoulQuest.security.APILoginFailHandler;
//import com.positive.culture.seoulQuest.security.APILoginSuccessHandler;
//import com.positive.culture.seoulQuest.security.CustomAccessDeniedHandler;
//import com.positive.culture.seoulQuest.security.JWTCheckFilter;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@Log4j2
@RequiredArgsConstructor
//@EnableMethodSecurity  // 메서드 별 권한 체크
public class CustomSecurityConfig {

    // @Configuration 아래 @Bean 을 만들면 스프링에서 객체를 관리함
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        log.info("----security config----");
//        // p302
//        http.cors(httpSecurityCorsConfigurer -> {
//            httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
//        });
//        http.sessionManagement(sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//        http.csrf(i->i.disable());
//
//        // p312 post 방식으로 parameter 를 통해 로그인 처리
//        http.formLogin(config -> {
//            config.loginPage("/api/member/login");
//            config.successHandler(new APILoginSuccessHandler());
//            config.failureHandler(new APILoginFailHandler());
//        });
//
//        // p329 Filter
//        http.addFilterBefore(new JWTCheckFilter(),
//                UsernamePasswordAuthenticationFilter.class);// JWT Check
//
//        // p340
//        http.exceptionHandling(i -> {
//            i.accessDeniedHandler(new CustomAccessDeniedHandler());
//        });
//
//        return http.build();
//    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","HEAD","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

//    // p303
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder(); // 암호 알고리즘 (중요함!!)
//    }
}