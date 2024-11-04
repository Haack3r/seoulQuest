package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.*;
import com.positive.culture.seoulQuest.service.TourService;

import com.positive.culture.seoulQuest.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/user/tours")
@PreAuthorize("hasAnyRole('ROLE_USER')")
public class TourController {
    private final CustomFileUtil fileUtil;
    private final TourService tourService;


    //전체 목록 조회 - test 성공 (유저 , 관리자)
    @GetMapping("/list")
    public PageResponseDTO<TourDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("list.........." + pageRequestDTO);
        return tourService.getList(pageRequestDTO);
    }

    //파일 등록 - test 성공 (관리자)
    @PostMapping("/")
    public Map<String, Long> register(TourDTO tourDTO) {
        log.info("register: " + tourDTO);
        List<MultipartFile> files = tourDTO.getFiles(); //사용자가 등록한 실제 파일들을 가져와서 새 리스트에 저장
        List<String> uploadFileNames = fileUtil.saveFiles(files); //실제 등록한 파일들의 이름을 문자열로 반환하여 리스트에 저장.

        tourDTO.setUploadFileNames(uploadFileNames);

        log.info(uploadFileNames);

        Long tno = tourService.register(tourDTO);
        return Map.of("RESULT", tno);
    }

    //업로드된 파일 보여주기 (유저, 관리자)
    //http://localhost:8080/api/products/view/파일명.파일형식 (upload폴더에 존재하는 파일)으로 접속하여 test-성공
    //URL로 파일 이름을 받아와서 fileUtil을 통해 파일을 유저에게 전송
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    //단일 상품 조회 - test 성공 (유저, 관리자)
    @GetMapping("/{tno}")
    public TourDTO read(@PathVariable(name = "tno") Long tno) {
        return tourService.get(tno);
    }

    //수정 - test 성공 (관리자)
    @PutMapping("/{tno}")
    public Map<String, String> modify(@PathVariable(name = "tno") Long tno, TourDTO tourDTO) {
        tourDTO.setTno(tno); //값의 일관성을 보장하기 위해 pno를 다시 저장
        TourDTO oldTourDTO = tourService.get(tno); //pno로 기존 정보를 가져와서 저장

        //기존의 파일들( DB에 존재하는 파일들 - 수정과정에서 삭제되었을수 있음)
        List<String> oldFileNames = oldTourDTO.getUploadFileNames();

        //새로 업로드 해야하는 파일들
        List<MultipartFile> files = tourDTO.getFiles();

        //새로 업로드 되어서 만들어진 파일 이름들
        List<String> currentUploadFileNames = fileUtil.saveFiles(files);

        //화면에서 변화없이 계속 유지된 파일들
        List<String> uploadedFileNames = tourDTO.getUploadFileNames();

        //유지되는 파일들 + 새로 업로드 된 파일 이름들이 저장해야하는 파일 목록이 됨
        if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
            uploadedFileNames.addAll(currentUploadFileNames);
        }

        //수정작업
        tourService.modify(tourDTO);
        //지워져야하는 목록찾기
        if (oldFileNames != null && oldFileNames.size() > 0) {
            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1) //조건이 참인 경우를 만족하는 요소들을 리스트로 저장
                    .collect(Collectors.toList());

            //실제 파일 삭제
            fileUtil.deleteFiles(removeFiles);
        }
        return Map.of("RESULT", "SUCCESS");
    }

    //상품 삭제 - test 성공 (관리자)
    @DeleteMapping("/{tno}")
    public Map<String, String> remove(@PathVariable("tno") Long tno) {
        //삭제 해야할 파일들 알아내기
        List<String> oldFileNames = tourService.get(tno).getUploadFileNames();

        tourService.remove(tno);
        fileUtil.deleteFiles(oldFileNames);

        return Map.of("RESULT", "SUCCESS");
    }

}
