package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.domain.ProductImage;
import com.positive.culture.seoulQuest.domain.QProduct;
import com.positive.culture.seoulQuest.dto.PageRequestDTO;
import com.positive.culture.seoulQuest.dto.PageResponseDTO;
import com.positive.culture.seoulQuest.dto.ProductDTO;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import com.positive.culture.seoulQuest.util.CustomFileUtil;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor // final이 적용된 필드에 대한 생성자 만들어줌
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
<<<<<<< HEAD
    private final CustomFileUtil fileUtil;
=======
>>>>>>> 123e949 (1)

    // 전체 조회----(유저, 관리자)
    @Override
    public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO) {

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending());

        // Create search filter using BooleanBuilder
        BooleanBuilder booleanBuilder = getSearch(pageRequestDTO);
        QProduct qProduct = QProduct.product;
        booleanBuilder.and(qProduct.delFlag.eq(false));

        // 기본 조건 delFlag = false
        // booleanBuilder.and(qProduct.delFlag.eq(false));

        // 키워드 검색 조건
        // String keyword = pageRequestDTO.getKeyword();
        // if ( keyword != null && !keyword.trim().isEmpty()) {
        // booleanBuilder.and(qProduct.pname.contains(keyword));
        // }

        // <Object[]>에는 product, productImage 객체가 담겨있음
        Page<Product> result = productRepository.findAll(booleanBuilder, pageable);

        // Convert each Tour entity to a TourDTO
        List<ProductDTO> dtoList = result.stream()
                .map(this::entityChangeDTO)
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<ProductDTO>withAll()
                .dtoList(dtoList) // ProductDTO 객체가 담겨있는 list
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    // delFlag ( 삭제 처리 ) = true 를 제외한 * 이미지가 있는 * 리스트 조회
    @Override
    public PageResponseDTO<ProductDTO> getAdminProductList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending());

        // delFlag가 false인 상품만 조회
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        QProduct qProduct = QProduct.product;
        booleanBuilder.and(qProduct.delFlag.eq(false));

        // 키워드 검색
        if (pageRequestDTO.getKeyword() != null && !pageRequestDTO.getKeyword().trim().isEmpty()) {
            booleanBuilder.and(qProduct.pname.contains(pageRequestDTO.getKeyword())
                    .or(qProduct.category.categoryName.contains(pageRequestDTO.getKeyword())));
        }

        // fetch join으로 이미지 정보도 함께 조회
        Page<Product> result = productRepository.findAll(booleanBuilder, pageable);

        // // 모든 이미지 정보를 가져오기 위해 selectOne 호출
        // Product fullProduct = productRepository.selectOne(product.getPno())
        // .orElse(product);

        // entityChangeDTO 에서 처리되지 않는 부분 추가
        // dto.setDelFlag(product.isDelFlag());
        // dto.setLikesCount(product.getLikesCount());

        // 이미지 정보 처리
        // List<String> fileNames = product.getProductImageList().stream()
        // .map(ProductImage::getFileName)
        // .collect(Collectors.toList());
        // dto.setUploadFileNames(fileNames);

        // 이미지가 있는 경우에만 이미지 정보 설정
        // if (arr[1] != null) {
        // ProductImage productImage = (ProductImage) arr[1];
        // dto.setUploadFileNames(List.of(productImage.getFileName()));
        // } else {
        // // 이미지가 없는 경우 빈 리스트 설정
        // dto.setUploadFileNames(new ArrayList<>());
        // }

        // return dto;
        // })
        // .collect(Collectors.toList());

        List<ProductDTO> dtoList = result.getContent().stream()
                .map(product -> {
                    // 각 상품에 대해 이미지 정보를 포함한 상세 정보 조회
                    Optional<Product> productWithImages = productRepository.selectOne(product.getPno());
                    Product fullProduct = productWithImages.orElse(product);

                    ProductDTO dto = entityChangeDTO(fullProduct);

                    // 이미지 정보 처리
                    List<ProductImage> imageList = fullProduct.getProductImageList();
                    if (imageList != null && !imageList.isEmpty()) {
                        List<String> fileNames = imageList.stream()
                                .map(ProductImage::getFileName)
                                .collect(Collectors.toList());
                        dto.setUploadFileNames(fileNames);
                    } else {
                        dto.setUploadFileNames(new ArrayList<>());
                    }

                    return dto;
                })
                .collect(Collectors.toList());

        return PageResponseDTO.<ProductDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();
    }

    // delFlag ( 삭제 처리 ) = true 를 제외한 * 이미지가 없는 * 리스트 조회
    @Override
    public PageResponseDTO<ProductDTO> getAdminProductListNoImage(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending());

        Page<Product> result = productRepository.AdminProductListNoImage(pageable, pageRequestDTO.getKeyword());

        List<ProductDTO> dtoList = result.getContent().stream()
                .map(product -> {
                    ProductDTO dto = entityChangeDTO(product);
                    dto.setDelFlag(product.isDelFlag());
                    dto.setLikesCount(product.getLikesCount());
                    // 이미지 없이 빈 리스트로 설정
                    dto.setUploadFileNames(new ArrayList<>());
                    return dto;
                })
                .collect(Collectors.toList());

        return PageResponseDTO.<ProductDTO>withAll()
                .dtoList(dtoList)
                .totalCount(result.getTotalElements())
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    // 하나 조회---(유저, 관리자)
    @Override
    public ProductDTO get(Long pno) {
        Optional<Product> result = productRepository.selectOne(pno);
        Product product = result.orElseThrow();
        ProductDTO productDTO = entityChangeDTO(product);

        List<ProductImage> imageList = product.getProductImageList();
        if (imageList == null || imageList.size() == 0)
            return productDTO; // 이미지가 없는 상품인 경우

        // 이미지가 있는 상품인 경우
        List<String> fileNameList = imageList.stream().map(productImage -> productImage.getFileName()).toList();
        productDTO.setUploadFileNames(fileNameList);

        return productDTO;
    }

    // ---------------------------------------------------------------

    // 등록 --(관리자)
    @Override
    public Long register(ProductDTO productDTO) {
        String categoryName = productDTO.getCategoryName();
        String categoryType = "product";

        // 기존에 있는 카테고리인지 확인
        Category category = categoryRepository
                .findByCategoryNameAndCategoryType(categoryName, categoryType);

        if (category == null) {
            // 카테고리를 새로 등록
            category = Category.builder()
                    .categoryName(categoryName)
                    .categoryType(categoryType)
                    .build();
            category = categoryRepository.save(category);
        }

        Product product = dtoToEntity(productDTO, category);
        Product savedProduct = productRepository.save(product);

        return savedProduct.getPno();
    }

    // ----------------------------------------------------------------
    // 수정 --(관리자)
    @Override
    public void modify(ProductDTO productDTO) {
<<<<<<< HEAD
=======
        // 1. 기존 상품 조회
>>>>>>> 123e949 (1)
        Optional<Product> result = productRepository.findById(productDTO.getPno());
        Product product = result.orElseThrow();
        Category category = product.getCategory();

<<<<<<< HEAD
        // 기존 이미지 목록 초기화
        product.clearList();

        // 새로운 이미지 목록 설정
        if (productDTO.getUploadFileNames() != null && !productDTO.getUploadFileNames().isEmpty()) {
            productDTO.getUploadFileNames().forEach(product::addImageString);
        }

        category.ChangeCategoryName(productDTO.getCategoryName());
        category.ChangeCategoryType(productDTO.getCategoryType());
=======
        // 2. 기본 정보 업데이트
>>>>>>> 123e949 (1)
        product.changeName(productDTO.getPname());
        product.changeDesc(productDTO.getPdesc());
        product.changePrice(productDTO.getPprice());
        product.changeQuantity(productDTO.getPqty());
        product.changeShippingFee(productDTO.getShippingFee());

<<<<<<< HEAD
        // // 나머지 필드 업데이트
        // product.changeBasicInfo(
        // productDTO.getPname(),
        // productDTO.getPdesc(),
        // productDTO.getPprice(),
        // productDTO.getPqty(),
        // productDTO.getShippingCost());

=======
        // 3. 이미지 처리 - 기존 이미지는 유지하고 새 이미지만 추가
        List<String> newUploadFileNames = productDTO.getUploadFileNames();

        if (newUploadFileNames != null && !newUploadFileNames.isEmpty()) {
            // 기존 이미지 리스트 유지하면서 새 이미지 추가
            newUploadFileNames.forEach(uploadName -> {
                if (!product.getUploadFileNames().contains(uploadName)) {
                    product.addImageString(uploadName);
                }
            });
        }

>>>>>>> 123e949 (1)
        productRepository.save(product);
    }

    // ----------------------------------------------------------
    // 삭제 -- (관리자)
    @Override
    public void remove(Long pno) {
        productRepository.updateToDelete(pno, true);
    }

    @Override
    public void removeProductImage(Long pno, String fileName) {
        // DB에서 이미지 레코드 삭제
        productRepository.deleteProductImage(pno, fileName);

        // 실제 파일 시스템에서도 이미지 삭제
        try {
            fileUtil.deleteFiles(List.of(fileName));
        } catch (Exception e) {
            log.error("파일 삭제 실패: " + fileName, e);
            throw new RuntimeException("이미지 파일 삭제 실패");
        }
    }

    private BooleanBuilder getSearch(PageRequestDTO requestDTO) {
        String type = requestDTO.getType();
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        QProduct qProduct = QProduct.product;
        String keyword = requestDTO.getKeyword();

        BooleanExpression expression = qProduct.pno.gt(0L);

        booleanBuilder.and(expression);

        if (type == null || type.trim().length() == 0) {
            return booleanBuilder;
        }
        BooleanBuilder conditionBuilder = new BooleanBuilder();
        if (type.contains("t")) {
            conditionBuilder.or(qProduct.pname.contains(keyword));
        }
        if (type.contains("c")) {
            conditionBuilder.or(qProduct.pname.contains(keyword));
        }
        if (type.contains("w")) {
            conditionBuilder.or(qProduct.pname.contains(keyword));
        }

        booleanBuilder.and(conditionBuilder);

        return booleanBuilder;
    }

}
