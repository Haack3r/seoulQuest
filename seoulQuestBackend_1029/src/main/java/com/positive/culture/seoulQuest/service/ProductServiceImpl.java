package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.ProductImage;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor //final이 적용된 필드에 대한 생성자 만들어줌
@Transactional
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    //전체 조회----(유저, 관리자)
    @Override
    public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO) {

        Pageable pageable =  PageRequest.of(
                pageRequestDTO.getPage()-1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending());

        //<Object[]>에는 product, productImage 객체가 담겨있음
        Page<Object[]> result = productRepository.selectList(pageable);

        List<ProductDTO> dtoList = result.get().map(arr->{
            Product product = (Product) arr[0];
            ProductImage productImage = (ProductImage) arr[1];

            //Entity를 DTO로 변환
            ProductDTO productDTO = entityChangeDTO(product);

            String imageStr = productImage.getFileName();
            productDTO.setUploadFileNames(List.of(imageStr)); //List.of 불변하는 리스트를 생성
            return productDTO;
        }).collect(Collectors.toList()); //end of map , map으로 productDTO의 리스트를 만듦

        long totalCount= result.getTotalElements();

        return PageResponseDTO.<ProductDTO>withAll()
                .dtoList(dtoList) //ProductDTO 객체가 담겨있는 list
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    //하나 조회---(유저, 관리자)
    @Override
    public ProductDTO get(Long pno) {
        Optional<Product> result = productRepository.selectOne(pno);
        Product product = result.orElseThrow();
        ProductDTO productDTO = entityChangeDTO(product);

        List<ProductImage> imageList = product.getImageList();
        if(imageList == null|| imageList.size()==0 )return productDTO; //이미지가 없는 상품인 경우

        //이미지가 있는 상품인 경우
        List<String> fileNameList = imageList.stream().map(productImage -> productImage.getFileName()).toList();
        productDTO.setUploadFileNames(fileNameList);

        return productDTO;
    }


    //---------------------------------------------------------------

    //등록 --(관리자)
    @Override
    public Long register(ProductDTO productDTO) {
        Product product = dtoToEntity(productDTO);
        Product result = productRepository.save(product);
        return result.getPno();
    }



    //----------------------------------------------------------------
    //수정 --(관리자)
    @Override
    public void modify(ProductDTO productDTO) {

        //1.read
        Optional<Product> result = productRepository.findById(productDTO.getPno());
        Product product = result.orElseThrow();

        //2.change pname, pdesc, price,quantity, catergoryName, updateAt
        product.changeName(productDTO.getPname());
        product.changeDesc(productDTO.getPdesc());
        product.changePrice(productDTO.getPrice());
        product.changeQuantity(productDTO.getQuantity());
        product.changeShippingCost(productDTO.getShippingCost());
        product.preUpdate();

        //3. upload File -- clear first
        product.clearList(); // clearList()를 이용하여 이미지 리스트를 삭제

        //4. save
        List<String> uploadFileNames = productDTO.getUploadFileNames();

        if(uploadFileNames !=null && uploadFileNames.size()>0){
            uploadFileNames.stream().forEach(uploadName->{
                product.addImageString(uploadName);
            });
        }
        productRepository.save(product);
    }

    //----------------------------------------------------------
    //삭제 -- (관리자)
    @Override
    public void remove(Long pno) {
        productRepository.updateToDelete(pno, true);
    }



}
