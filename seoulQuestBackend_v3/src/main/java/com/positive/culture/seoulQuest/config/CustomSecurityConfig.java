package com.positive.culture.seoulQuest.config;

//import com.positive.culture.seoulQuest.security.APILoginFailHandler;
//import com.positive.culture.seoulQuest.security.APILoginSuccessHandler;
//import com.positive.culture.seoulQuest.security.CustomAccessDeniedHandler;
//import com.positive.culture.seoulQuest.security.JWTCheckFilter;

import com.positive.culture.seoulQuest.security.filter.JWTCheckFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@Log4j2
@RequiredArgsConstructor
//@EnableMethodSecurity  // 메서드 별 권한 체크
public class CustomSecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Enable CORS and disable CSRF (since you're using JWT and stateless sessions)
        http.cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS using the corsConfigurationSource
                .csrf(csrf -> csrf.disable());

        // Stateless session management (JWT-based)
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Allow unauthenticated access to the products list and product view endpoints
        http.authorizeHttpRequests(auth -> {
            auth
                    .requestMatchers("/api/products/list", "/api/products/view/**", "/api/products/read/", "/api/products/{pno}").permitAll() // Public access
                    .requestMatchers("/api/tours/list", "/api/tours/view/**", "/api/tours/read/", "/api/tours/{pno}").permitAll() // Public access
                    .anyRequest().authenticated(); // Protect other endpoints
        });

        // Add your JWT check filter only for authenticated routes
        http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

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

    //시큐리티 구현 후 사용할 CORS 설정
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

    // p303
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 암호 알고리즘 (중요함!!)
    }
}