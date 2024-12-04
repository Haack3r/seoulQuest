package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.FavoriteTourDTO;
import com.positive.culture.seoulQuest.service.FavoriteTourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favoriteTour")
public class FavoriteTourController {

    @Autowired
    private FavoriteTourService favoriteTourService;

    @PostMapping("/change")
    public FavoriteTourDTO addFavorite(@RequestBody Map<String, Object> request){
        String email = (String) request.get("email");
        Long tno = Long.valueOf(request.get("tno").toString());
        return favoriteTourService.addFavoriteTour(email,tno);
    }

    @GetMapping("/items/{email}")
    public List<FavoriteTourDTO> getFavorites(@PathVariable String email) {
        return favoriteTourService.getFavoritesByEmail(email);
    }

    @DeleteMapping("/item/{ftino}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void  deleteFavorite(@PathVariable Long ftino){
        favoriteTourService.deleteFavoriteByFtino(ftino);
    }

    @DeleteMapping("/items/bulk-delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFavoritesBulk(@RequestBody List<Long> ftinoList) {
        if (ftinoList == null || ftinoList.isEmpty()) {
            throw new IllegalArgumentException("ftinoList cannot be null or empty");
        }
        favoriteTourService.deleteFavoritesBulk(ftinoList);
    }
}
