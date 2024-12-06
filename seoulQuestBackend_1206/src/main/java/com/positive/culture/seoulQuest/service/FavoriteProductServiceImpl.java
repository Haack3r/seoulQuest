package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.FavoriteProduct;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.dto.FavoriteProductDTO;
import com.positive.culture.seoulQuest.repository.FavoriteProductRepository;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteProductServiceImpl implements FavoriteProductService {

    @Autowired
    private FavoriteProductRepository favoriteProductRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProductRepository productRepository;

//    @Override
//    public FavoriteProductDTO addFavoriteProduct(String email, Long pno) {
//        Member member = memberRepository.findByEmail(email)
//                .orElseThrow(() -> new IllegalArgumentException("Member not found with email: " + email));
//
//        Product product = productRepository.findById(pno)
//                .orElseThrow(() -> new IllegalArgumentException("Product not found with pno: " + pno));
//
//        FavoriteProduct favoriteProduct = new FavoriteProduct(member, product);
//        favoriteProduct.setCreatedAt(LocalDateTime.now());
//        favoriteProductRepository.save(favoriteProduct);
//
//        return convertToDTO(favoriteProduct);
//    }

    @Override
    public FavoriteProductDTO addFavoriteProduct(String email, Long pno) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with email: " + email));
        Product product = productRepository.findById(pno)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with pno: " + pno));

        // Check if the product is already in the user's favorites
        Optional<FavoriteProduct> existingFavorite = favoriteProductRepository.findByMemberAndProduct(member, product);
        if (existingFavorite.isPresent()) {
            throw new IllegalArgumentException("Product already liked by this user");
        }

        // Add the product to favorites if it's not already present
        FavoriteProduct favoriteProduct = new FavoriteProduct(member, product);
        favoriteProduct.setCreatedAt(LocalDateTime.now());
        favoriteProductRepository.save(favoriteProduct);

        return convertToDTO(favoriteProduct);
    }


    @Override
    public List<FavoriteProductDTO> getFavoritesByEmail(String email) {
        System.out.println("service email: 200" +email);
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with email: " + email));
        System.out.println("service email: 201" +member);
        List<FavoriteProductDTO> dtoList = favoriteProductRepository.findByMember(member)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        dtoList.forEach(i-> System.out.println(i));
        return dtoList;
    }

    @Override
    public void deleteFavoriteByFino(Long fino) {
        favoriteProductRepository.deleteById(fino);
    }

    @Override
    public void deleteFavoritesBulk(List<Long> finoList) {
        favoriteProductRepository.deleteAllById(finoList);
    }

    private FavoriteProductDTO convertToDTO(FavoriteProduct favoriteProduct) {
        return FavoriteProductDTO.builder()
                .fino(favoriteProduct.getId())
                .email(favoriteProduct.getMember().getEmail())
                .pno(favoriteProduct.getProduct().getPno())
                .pname(favoriteProduct.getProduct().getPname())
                .pdesc(favoriteProduct.getProduct().getPdesc())
                .pprice(favoriteProduct.getProduct().getPprice())
                .pqty(favoriteProduct.getProduct().getPqty())
                .uploadFileNames(favoriteProduct.getProduct().getProductImageList()
                        .stream()
                        .map(image -> image.getFileName())
                        .collect(Collectors.toList()))
                .addedAt(favoriteProduct.getCreatedAt())
                .build();
    }
}
