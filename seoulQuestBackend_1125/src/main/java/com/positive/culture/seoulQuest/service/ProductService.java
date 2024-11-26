package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.dto.TourDTO;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ProductService {



    //전체 조회
    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);

    //하나 조회
    ProductDTO get(Long pno);

    //등록
    Long register(ProductDTO productDTO);

    //수정
    void modify(ProductDTO productDTO);

    //삭제
    void remove(Long pno);

    //DTO를 엔티티로 변환해주는 메서드 -> register에 사용
    default
    public Product dtoToEntity(ProductDTO productDTO){

        //나중에 수정해야함
        Category cartegory =new Category(5l,"sadfa","asdfaf");

        Product product =Product.builder()
                .category(cartegory)
                .pno(productDTO.getPno())
                .pname(productDTO.getPname())
                .pdesc(productDTO.getPdesc())
                .pprice(productDTO.getPprice())
                .pqty(productDTO.getPqty())
                .createAt(productDTO.getCreateAt())
                .updateAt(productDTO.getUpdateAt())
                .build();

        //업로드 처리가 끝난 파일들의 이름 리스트
        List<String> uploadFileNames = productDTO.getUploadFileNames();

        if(uploadFileNames== null){
            return product;
        }

        uploadFileNames.stream().forEach(uploadNames ->{
            product.addImageString(uploadNames);
        });

        return product;
    }

    //엔티티를 DTO로 변환해주는 메서드  -> getList와 get에 사용
    default
    public ProductDTO entityChangeDTO(Product product){
        ProductDTO productDTO = ProductDTO.builder()
                .pno(product.getPno())
                .categoryName(product.getCategory().getCategoryName())
                .categoryType(product.getCategory().getCategoryType())
                .pname(product.getPname())
                .pdesc(product.getPdesc())
                .pprice(product.getPprice())
                .shippingFee(product.getShippingFee())
                .pqty(product.getPqty())
                .createAt(product.getCreateAt())
                .createAt(product.getUpdateAt())
                .build();
        return productDTO;
    }
    public PageResponseDTO<ProductDTO> getListWithCategory(PageRequestDTO pageRequestDTO, String category);

}
