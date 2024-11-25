package com.positive.culture.seoulQuest.config;

import com.positive.culture.seoulQuest.security.filter.JWTCheckFilter;
import com.positive.culture.seoulQuest.security.handler.APILoginFailHandler;
import com.positive.culture.seoulQuest.security.handler.APILoginSuccessHandler;
import com.positive.culture.seoulQuest.security.handler.CustomAccessDeniedHandler;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@Log4j2
@RequiredArgsConstructor
// @EnableMethodSecurity // 메서드 별 권한 체크
public class CustomSecurityConfig {
    // @Configuration 아래 @Bean 을 만들면 스프링에서 객체를 관리함
    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws
    // Exception {
    // // Enable CORS and disable CSRF (since you're using JWT and stateless
    // sessions)
    // http.cors(cors -> cors.configurationSource(corsConfigurationSource())) //
    // Enable CORS using the corsConfigurationSource
    // .csrf(csrf -> csrf.disable());
    //
    // // Stateless session management (JWT-based)
    // http.sessionManagement(session ->
    // session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    //
    // // Allow unauthenticated access to the products list and product view
    // endpoints
    // http.authorizeHttpRequests(auth -> {
    // auth
    // .requestMatchers("/api/products/list", "/api/products/view/**",
    // "/api/products/read/", "/api/products/{pno}").permitAll() // Public access
    // .anyRequest().authenticated(); // Protect other endpoints
    // });
    //
    // // Add your JWT check filter only for authenticated routes
    // http.addFilterBefore(new JWTCheckFilter(),
    // UsernamePasswordAuthenticationFilter.class);
    //
    // return http.build();
    // }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("----security config----");

        http.cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS with configuration
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(csrf -> csrf.disable());

        http.authorizeHttpRequests(auth -> auth
                // .requestMatchers(HttpMethod.OPTIONS, "/api/member/signup",
                // "/api/member/check",
                // "/api/member/checknickname","/api/member/login").permitAll() // Permit
                // OPTIONS requests
                .requestMatchers(
                        "/api/member/signup",
                        "/api/member/check",
                        "/api/member/checknickname",
                        "/api/member/login",
                        "/api/mypage/**",
                        "/api/user/tours/view/**",
                        "/api/user/products/view/**",
                        "/api/user/tours/mapData",
                        "/api/user/tours/by-address",
                        "/api/products/**",
                        "/api/tours/**",
                        "/api/mypage/findpassword",
                        "/api/mypage/findemail",
                        "/upload/**",
                        "/api/admin/product/image/**",
                        "/api/admin/tour/image/**",
                        "/api/product/image/**",
                        "/api/tour/image/**")
                .permitAll()// Allow unauthenticated access
                .requestMatchers(
                        HttpMethod.OPTIONS,
                        "/upload/**",
                        "/api/member/signup",
                        "/api/member/check",
                        "/api/member/checknickname",
                        "/api/member/login",
                        "/api/tours/**",
                        "/api/products/**",
                        "/api/user/tours/view/**",
                        "/api/user/products/view/**",
                        "/api/user/tours/mapData",
                        "/api/user/tours/by-address")
                .permitAll()
                // .requestMatchers(HttpMethod.GET, "/api/admin/product/**").hasRole("ADMIN")
                // .requestMatchers(HttpMethod.POST, "/api/admin/product/**").hasRole("ADMIN")
                // .requestMatchers(HttpMethod.PUT, "/api/admin/product/**").hasRole("ADMIN")
                // .requestMatchers(HttpMethod.DELETE, "/api/admin/product/**").hasRole("ADMIN")
                // .requestMatchers(HttpMethod.HEAD, "/api/admin/product/**").hasRole("ADMIN")
                // .requestMatchers(HttpMethod.OPTIONS,
                // "/api/admin/product/**")
                // .hasRole("ADMIN")
                .requestMatchers("/api/admin/**").hasAnyAuthority("ADMIN")
                .anyRequest().authenticated());

        http.formLogin(config -> {
            config.loginPage("/api/member/login").permitAll();
            config.successHandler(new APILoginSuccessHandler());
            config.failureHandler(new APILoginFailHandler());
        });

        // JWT 체크 필터 추가
        http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class);

        // 인증 / 인가 실패 핸들러 설정
        http.exceptionHandling(exception -> exception
                .accessDeniedHandler(new CustomAccessDeniedHandler())
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json");
                    response.getWriter().write("{\"error\": \"Unauthorized\"}");
                }));
        return http.build();
    }
    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // log.info("----security config----");
    // // p302
    // http.cors(httpSecurityCorsConfigurer -> {
    // httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
    // });
    // http.sessionManagement(sessionConfig ->
    // sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    // http.csrf(i->i.disable());
    //
    // // p312 post 방식으로 parameter 를 통해 로그인 처리
    // http.formLogin(config -> {
    // config.loginPage("/api/member/login");
    // config.successHandler(new APILoginSuccessHandler());
    // config.failureHandler(new APILoginFailHandler());
    // });
    //
    // // p329 Filter
    // http.addFilterBefore(new JWTCheckFilter(),
    // UsernamePasswordAuthenticationFilter.class);// JWT Check
    //
    // // p340
    // http.exceptionHandling(i -> {
    // i.accessDeniedHandler(new CustomAccessDeniedHandler());
    // });
    //
    //
    //
    // return http.build();
    // }

    // @Bean
    // public CorsConfigurationSource corsConfigurationSource() {
    // CorsConfiguration configuration = new CorsConfiguration();
    // configuration.setAllowCredentials(true);
    // configuration.setAllowedOriginPatterns(Arrays.asList("*"));
    // configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    // configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","HEAD","OPTIONS"));
    // configuration.setAllowedHeaders(Arrays.asList("Authorization",
    // "Cache-Control", "Content-Type"));
    // UrlBasedCorsConfigurationSource source = new
    // UrlBasedCorsConfigurationSource();
    // source.registerCorsConfiguration("/**", configuration);
    // return source;
    // }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
        // configuration.setAllowedHeaders(Arrays.asList("*"));
        // configuration.setExposedHeaders(Arrays.asList("Authorization"));
        // 허용할 헤더 설정
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "X-Requested-With",
            "Accept",
            "Origin",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers"
        ));
        
        // 클라이언트에게 노출할 헤더 설정
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization",           // JWT 토큰
            "X-Total-Count",          // 페이징 정보
            "Content-Disposition"      // 파일 다운로드
        ));
        
        // preflight 요청의 캐시 시간 설정 (1시간)
        configuration.setMaxAge(3600L);

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