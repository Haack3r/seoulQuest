package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.dto.FavoriteProductDTO;
import com.positive.culture.seoulQuest.dto.FavoriteTourDTO;

import java.util.List;

public interface FavoriteTourService {
    FavoriteProductDTO addFavoriteTour(String email, Long tno);
    List<FavoriteTourDTO> getFavoritesByEmail(String email);
    void deleteFavoriteByFtino(Long ftino);
    void deleteFavoritesBulk(List<Long> ftinoList);

}
