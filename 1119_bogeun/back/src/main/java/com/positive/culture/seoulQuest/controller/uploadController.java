//package com.positive.culture.seoulQuest.controller;
//
//import com.positive.culture.seoulQuest.util.CustomFileUtil;
//import jakarta.servlet.http.HttpServletRequest;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.io.Resource;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/random")
//@CrossOrigin("http://localhost:3000")
//public class uploadController {
//
//    @Autowired
//    private CustomFileUtil fileUtil;
//
//    @GetMapping("/view/**")
//    public ResponseEntity<Resource> viewFileGet(HttpServletRequest request) {
//        String fileName = request.getRequestURI().split("/view/")[1];  // Extract everything after "/view/"
//        System.out.println("1000) fileName: " + fileName);
//        return fileUtil.getFile(fileName);
//    }
//}
