package com.green.jaeyoon.goodmorning.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@Log4j2
@RequiredArgsConstructor

public class CustomFileUtil {

    @Value("${com.green.jaeyoon.goodmorning.path}")
    private String uploadPath;

    @PostConstruct
    public void init() {
        File tempFolder = new File(uploadPath);
        if(tempFolder.exists() == false) tempFolder.mkdir();    //폴더 없으면 새로 생성
        uploadPath = tempFolder.getAbsolutePath();  //절대 경로 얻어옴
        log.info("============================");
        log.info("uploadPath : " + uploadPath);
    }

    //p189, 파일 저장 시 이미지 파일인 경우 썸네일 생성
    public List<String> saveFiles(List<MultipartFile> files)throws RuntimeException {

        if(files == null || files.size() == 0) return List.of();

        List<String> uploadNames = new ArrayList<>();

        for(MultipartFile file : files) {
            // 파일명이 동일한 것을 업로드할 수 있도록 자바에서 제공하는 유틸리티인 고유 uuid 를 이용하여 파일명 앞에 추가
            String savedName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            Path savePath = Paths.get(uploadPath, savedName);

            try{
                Files.copy(file.getInputStream(), savePath);

                // 썸네일 이미지 관련 추가
                String contentType = file.getContentType();

                // 이미지 여부 확인
                if(contentType != null && contentType.startsWith("image")) {
                    // 원본 파일과 혼동되지 않도록 파일 맨 앞에 "s_" 추가
                    Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);

                    Thumbnails.of(savePath.toFile())
                            .size(200, 200)
                            .toFile(thumbnailPath.toFile());
                }
                uploadNames.add(savedName);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }
        }
        return uploadNames;
    }

    public ResponseEntity<Resource> getFile(String fileName) {
        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);
        // 읽을 수 없는 파일이면 기본 default.jpeg를 출력하고 읽을 수 있으면 읽어온 파일을 출력함
        if(!resource.isReadable()) resource = new FileSystemResource(uploadPath + File.separator + "default.jpeg");
        // 파일의 경로에서 구분자(seperator)를 이용하여 파일 systemResource를 생성함

        HttpHeaders headers = new HttpHeaders();
        try {
            // html문서의 header에서 content-type을 조사(probe)하여 타입을 header에 정보를 실어서 보냄
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (Exception e) {
            // 오류 정보 반환
            return ResponseEntity.internalServerError().build();
        }
        // 성공적으로 반환하는 정보(header)와 이미지(body)를 반환
        // ResponseEntity를 header와 body를 같이 전송
        return ResponseEntity.ok().headers(headers).body(resource);
    }

    public void deleteFiles(List<String> fileNames) {
        if(fileNames == null || fileNames.size() == 0) return;

        fileNames.forEach(fileName -> {
            //썸네일이 있는지 확인하고 삭제
            String thumbnailFileName = "s_" + fileName;
            Path thumbnailPath = Paths.get(uploadPath, thumbnailFileName);
            Path filePath = Paths.get(uploadPath, fileName);

            try {
                Files.deleteIfExists(filePath);
                Files.deleteIfExists(thumbnailPath);
            } catch(IOException e) {
                throw new RuntimeException(e.getMessage());
            }
        });
    }


}
