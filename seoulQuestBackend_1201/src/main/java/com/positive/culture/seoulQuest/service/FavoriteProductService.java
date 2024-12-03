package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.dto.FavoriteProductDTO;

import java.util.List;

public interface FavoriteProductService {
    FavoriteProductDTO addFavoriteProduct(String email, Long pno);
    List<FavoriteProductDTO> getFavoritesByEmail(String email);
    void deleteFavoriteByFino(Long fino);
    void deleteFavoritesBulk(List<Long> finoList);
}
