package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.FavoriteTour;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.Tour;
import com.positive.culture.seoulQuest.dto.FavoriteProductDTO;
import com.positive.culture.seoulQuest.repository.FavoriteTourRepository;
import com.positive.culture.seoulQuest.repository.MemberRepository;
import com.positive.culture.seoulQuest.repository.TourRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@SpringBootTest
@Log4j2
public class FavoriteTourRepositoryTests {
    @Autowired
    FavoriteTourRepository favoriteTourRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    TourRepository tourRepository;

    @Test
    public void testAdd() {
        Member member = memberRepository.findByEmail("user1@gmail.com").orElseThrow();
        Tour tour = tourRepository.findById(1L).orElseThrow();

        FavoriteTour favoriteTour = new FavoriteTour(member, tour);
        favoriteTour.setCreatedAt(LocalDateTime.now());
        favoriteTourRepository.save(favoriteTour);

        log.info("FavoriteTour added successfully for member: " + member.getEmail() + ", tour ID: " + tour.getTno());
    }

    @Test
    public void getFavoritesByEmail() {
        String email = "user1@gmail.com";
        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<FavoriteTour> favoriteTours = favoriteTourRepository.findByMember(member);

        favoriteTours.forEach(favTour -> {
            log.info("Favorite Tour ID: " + favTour.getTour().getTno());
            log.info("Tour Name: " + favTour.getTour().getTname());
            log.info("Added At: " + favTour.getCreatedAt());
        });
    }

}
