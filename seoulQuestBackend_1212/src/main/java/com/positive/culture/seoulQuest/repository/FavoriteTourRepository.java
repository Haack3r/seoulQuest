package com.positive.culture.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.FavoriteTour;
import com.positive.culture.seoulQuest.domain.Member;
import com.positive.culture.seoulQuest.domain.Tour;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteTourRepository extends JpaRepository<FavoriteTour, Long> {
    @EntityGraph(attributePaths = {"tour"})
    List<FavoriteTour> findByMember(Member member);
    Optional<FavoriteTour> findByMemberAndTour(Member member, Tour tour);
}
