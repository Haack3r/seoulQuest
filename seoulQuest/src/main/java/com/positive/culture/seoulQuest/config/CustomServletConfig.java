package com.positive.culture.seoulQuest.config;


import com.positive.culture.seoulQuest.formatter.LocalDateFormatter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CustomServletConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatter(new LocalDateFormatter());
    }

    //시큐리티 구현전 써야할 CORS config -> 시큐리티 구현 후에는 이 메서드를 삭제하여도 된다.
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowedMethods("HEAD","GET","POST","PUT","DELETE","OPTIONS")
//                .maxAge(300)
//                .allowedHeaders("Authorization","Cache-Control","Content-Type");
//    }

}