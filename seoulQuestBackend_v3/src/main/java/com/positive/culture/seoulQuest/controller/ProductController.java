package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.service.ProductService;
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
@RequestMapping("/api/user/products")
public class ProductController {
    private final CustomFileUtil fileUtil;
    private final ProductService productService;

    //시큐리티 구현후 권한 추가
//    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    //전체 목록 조회 - test 성공 (유저 , 관리자)
    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO){
        log.info("list.........." + pageRequestDTO);
        return productService.getList(pageRequestDTO);
    }

    //파일 등록 - test 성공 (관리자)
    @PostMapping("/")
    public Map<String , Long> register(ProductDTO productDTO){
        log.info("register: " + productDTO);
        List<MultipartFile> files =  productDTO.getFiles(); //사용자가 등록한 실제 파일들을 가져와서 새 리스트에 저장
        List<String> uploadFileNames = fileUtil.saveFiles(files); //실제 등록한 파일들의 이름을 문자열로 반환하여 리스트에 저장.

        productDTO.setUploadFileNames(uploadFileNames);

        log.info(uploadFileNames);

        Long pno = productService.register(productDTO);
        return Map.of("RESULT",pno);
    }

    //업로드된 파일 보여주기 (유저, 관리자)
    //http://localhost:8080/api/products/view/파일명.파일형식 (upload폴더에 존재하는 파일)으로 접속하여 test-성공
    //URL로 파일 이름을 받아와서 fileUtil을 통해 파일을 유저에게 전송
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable String fileName){
        return fileUtil.getFile(fileName);
    }

    //단일 상품 조회 - test 성공 (유저, 관리자)
    @GetMapping("/{pno}")
    public ProductDTO read(@PathVariable(name="pno") Long pno){
        return productService.get(pno);
    }

    //수정 - test 성공 (관리자)
    @PutMapping("/{pno}")
    public Map<String, String> modify(@PathVariable(name="pno")Long pno, ProductDTO productDTO){
        productDTO.setPno(pno); //값의 일관성을 보장하기 위해 pno를 다시 저장
        ProductDTO oldProductDTO = productService.get(pno); //pno로 기존 정보를 가져와서 저장

        //기존의 파일들( DB에 존재하는 파일들 - 수정과정에서 삭제되었을수 있음)
        List<String> oldFileNames = oldProductDTO.getUploadFileNames();

        //새로 업로드 해야하는 파일들
        List<MultipartFile> files = productDTO.getFiles();

        //새로 업로드 되어서 만들어진 파일 이름들
        List<String> currentUploadFileNames =fileUtil.saveFiles(files);

        //화면에서 변화없이 계속 유지된 파일들
        List<String> uploadedFileNames = productDTO.getUploadFileNames();

        //유지되는 파일들 + 새로 업로드 된 파일 이름들이 저장해야하는 파일 목록이 됨
        if(currentUploadFileNames != null && currentUploadFileNames.size() >0){
            uploadedFileNames.addAll(currentUploadFileNames);
        }

        //수정작업
        productService.modify(productDTO);

        //지워져야하는 목록찾기
        if(oldFileNames !=null && oldFileNames.size()>0){
            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName->uploadedFileNames.indexOf(fileName)==-1)
                    .collect(Collectors.toList());

            //실제 파일 삭제
            fileUtil.deleteFiles(removeFiles);
        }
        return  Map.of("RESULT","SUCCESS");
    }

    //상품 삭제 - test 성공 (관리자)
    @DeleteMapping("/{pno}")
    public Map<String, String> remove(@PathVariable("pno")Long pno){
        //삭제 해야할 파일들 알아내기
        List<String> oldFileNames = productService.get(pno).getUploadFileNames();

        productService.remove(pno);
        fileUtil.deleteFiles(oldFileNames);

        return Map.of("RESULT","SUCCESS");
    }
}
