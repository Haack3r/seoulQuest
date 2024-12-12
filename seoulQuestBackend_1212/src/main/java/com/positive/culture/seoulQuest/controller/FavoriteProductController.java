package com.positive.culture.seoulQuest.controller;

import com.positive.culture.seoulQuest.dto.FavoriteProductDTO;
import com.positive.culture.seoulQuest.service.FavoriteProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteProductController {

    @Autowired
    private FavoriteProductService favoriteProductService;

    @PostMapping("/change")
    public FavoriteProductDTO addFavorite(@RequestBody Map<String, Object> request) {
        String email = (String) request.get("email");
        Long pno = Long.valueOf(request.get("pno").toString());
        return favoriteProductService.addFavoriteProduct(email, pno);
    }


    @GetMapping("/items/{email}")
    public List<FavoriteProductDTO> getFavorites(@PathVariable String email) {
        System.out.println("items controller 111) " + email);
        return favoriteProductService.getFavoritesByEmail(email);
    }

    @DeleteMapping("/item/{fino}")
    @ResponseStatus(HttpStatus.NO_CONTENT)  // No content to indicate successful deletion
    public void deleteFavorite(@PathVariable Long fino) {
        System.out.println(fino);
        favoriteProductService.deleteFavoriteByFino(fino);
    }

    @DeleteMapping("/items/bulk-delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFavoritesBulk(@RequestBody List<Long> finoList) {
        System.out.println("finoList Test: " + finoList);
        if (finoList == null || finoList.isEmpty()) {
            throw new IllegalArgumentException("finoList cannot be null or empty");
        }
        favoriteProductService.deleteFavoritesBulk(finoList);
    }
}
