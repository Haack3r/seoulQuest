package com.positive.culture.seoulQuest.util;

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

@Component //자바에서 관리하는 bean객체
@Log4j2
@RequiredArgsConstructor
public class CustomFileUtil { //파일의 입출력을 담당

    @Value("${com.positive.culture.seoulQuest.path}")
    private String uploadPath;

    //--------------------upload 폴더 생성----------------------------
    @PostConstruct //CustomFileUtil 객체 생성후에 자동실행하여 upload 폴더가 없으면 새로 만듦
    public void init(){
        File tempFolder = new File(uploadPath);

        if(tempFolder.exists()==false){
            tempFolder.mkdir();
        }

        uploadPath = tempFolder.getAbsolutePath();

        log.info("=======================================");
        log.info(uploadPath);
    }

    //----------------------파일 업로드----------------------------(관리자)
    // 파일 저장 시 이미지 파일인 경우 썸네일 생성
    public List<String> saveFiles(List<MultipartFile> files) throws RuntimeException {
        // 1. 파일이 없거나 파일 리스트의 크기가 0인 경우 빈 리스트 반환
        if (files == null || files.size() == 0) return List.of();

        // 2. 업로드한 파일 이름들을 담을 리스트를 생성
        List<String> uploadNames = new ArrayList<>();

        // 3. 업로드된 실제 파일들의 처리
        for (MultipartFile file : files) {
            // 4. 파일명이 동일한 것을 업로드할 수 있도록 자바에서 제공하는 UUID를 이용하여 고유한 파일명을 생성
            String savedName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // 5. 저장할 파일 경로를 지정
            Path savePath = Paths.get(uploadPath, savedName);

            try {
                // 6. multipartFile.getInputStream()을 통해 파일의 내용을 스트림 방식으로 읽어옴
                // 7. Files.copy() 메소드를 사용하여 파일을 복사하여 서버에 저장
                Files.copy(file.getInputStream(), savePath);

                // 8. 업로드된 파일의 타입을 문자열로 가져옴
                String contentType = file.getContentType();

                // 9. contentType이 "image"인 경우에만 썸네일 처리
                if (contentType != null && contentType.startsWith("image")) {
                    // 10. 원본 파일과 혼동되지 않도록 파일 맨 앞에 "s_" 추가하여 썸네일 파일명 생성
                    Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);

                    // 11. Thumbnails 라이브러리를 사용하여 썸네일 생성
                    Thumbnails.of(savePath.toFile()) // 원본 파일을 입력
                            .size(200, 200) // 썸네일 크기 설정 (200x200 픽셀)
                            .toFile(thumbnailPath.toFile()); // 썸네일 파일로 저장
                }

                // 12. 파일의 이름들을 문자열로 리스트에 저장
                uploadNames.add(savedName);
            } catch (IOException e) {
                // 13. 예외 발생 시 RuntimeException으로 메시지를 전달하여 처리
                throw new RuntimeException(e.getMessage());
            }
        }

        // 14. 업로드한 파일 이름들의 리스트를 반환
        return uploadNames;
    }

    //----------------------특정한 파일 조회----------------------(유저, 관리자)
    // 본문 (body)의 데이터 타입을 Resource로 지정하여 ResponseEntity로 반환
    public ResponseEntity<Resource> getFile(String fileName) {
        // 1. 주어진 파일 이름을 사용하여 파일 시스템 리소스를 생성
        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);

        // 2. 파일이 읽을 수 없는 경우 기본 이미지인 "default.jpeg"를 사용
        if (!resource.isReadable()) {
            // 3. 기본 이미지를 리소스로 생성
            resource = new FileSystemResource(uploadPath + File.separator + "default.jpeg");
        }

        // 4. HTTP 헤더를 생성
        HttpHeaders headers = new HttpHeaders();

        try {
            // 5. 파일의 타입을 조사하여 content-type 헤더에 추가
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (Exception e) {
            // 6. 오류 발생 시 서버 내부 오류를 반환
            return ResponseEntity.internalServerError().build();
        }

        // 7. 성공적으로 파일 정보를 찾은 경우, 헤더와 본문(파일 리소스)을 반환
        // ResponseEntity를 사용하여 헤더와 본문을 포함한 응답을 생성
        return ResponseEntity.ok().headers(headers).body(resource);
    }

    //----------------------파일 삭제----------------------(관리자)
    public void deleteFiles(List<String> fileNames) {
        // 파일 이름 목록이 비어 있거나 null이면 메서드를 종료
        if(fileNames == null || fileNames.size() == 0) return;

        // 파일 이름 목록에 포함된 모든 파일에 대해 삭제 작업을 수행
        fileNames.forEach(fileName -> {
            // 썸네일 파일 이름을 생성 ("s_" 접두사를 붙임)
            String thumbnailFileName = "s_" + fileName;
            // 썸네일 파일 경로 및 원본 파일 경로 생성
            Path thumbnailPath = Paths.get(uploadPath, thumbnailFileName);
            Path filePath = Paths.get(uploadPath, fileName);

            try {
                // 원본 파일이 존재하면 삭제
                Files.deleteIfExists(filePath);
                // 썸네일 파일이 존재하면 삭제
                Files.deleteIfExists(thumbnailPath);
            } catch(IOException e) {
                // 파일 삭제 중 오류가 발생하면 RuntimeException 발생
                throw new RuntimeException(e.getMessage());
            }
        });
    }

}
