package com.positive.culture.seoulQuest.service;

import com.positive.culture.seoulQuest.domain.FavoriteProduct;
import com.positive.culture.seoulQuest.domain.FavoriteTour;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.dto.FavoriteProductDTO;
import com.positive.culture.seoulQuest.dto.FavoriteTourDTO;
import com.positive.culture.seoulQuest.repository.FavoriteTourRepository;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteTourServiceImpl implements FavoriteTourService {

    @Autowired
    private FavoriteTourRepository favoriteTourRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TourRepository tourRepository;

    @Override
    public FavoriteTourDTO addFavoriteTour(String email, Long tno) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        Tour tour = tourRepository.findById(tno).orElseThrow();

        Optional<FavoriteTour> existingFavorite = favoriteTourRepository.findByMemberAndTour(member, tour);
        if (existingFavorite.isPresent()) {
            throw new IllegalArgumentException("Tour already liked by this user");
        }
        FavoriteTour favoriteTour = new FavoriteTour(member,tour);
        favoriteTour.setCreatedAt(LocalDateTime.now());
        favoriteTourRepository.save(favoriteTour);
        return convertToDTO(favoriteTour);
    }

    @Override
    public List<FavoriteTourDTO> getFavoritesByEmail(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<FavoriteTourDTO> dtoList = favoriteTourRepository.findByMember(member)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        dtoList.forEach(i-> System.out.println(i));
        return dtoList;
    }

    @Override
    public void deleteFavoriteByFtino(Long ftino) {
        favoriteTourRepository.deleteById(ftino);

    }

    @Override
    public void deleteFavoritesBulk(List<Long> ftinoList) {
        favoriteTourRepository.deleteAllById(ftinoList);

    }

    private FavoriteTourDTO convertToDTO(FavoriteTour favoriteTour) {
        return FavoriteTourDTO.builder()
                .ftino(favoriteTour.getTid())
                .email(favoriteTour.getMember().getEmail())
                .tno(favoriteTour.getTour().getTno())
                .tname(favoriteTour.getTour().getTname())
                .tdesc(favoriteTour.getTour().getTdesc())
                .tprice(favoriteTour.getTour().getTprice())
                .uploadFileNames(favoriteTour.getTour().getTourImageList()
                        .stream()
                        .map(image -> image.getFileName())
                        .collect(Collectors.toList()))
                .addedAt(favoriteTour.getCreatedAt())
                .build();
    }
}
