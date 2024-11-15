package com.positive.culture.seoulQuest.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class TourApiService {
    private final String apiKey = "YOUR_SERVICE_KEY";

    public String fetchSeoulTouristSpots() {
        String url = "http://apis.data.go.kr/B551011/KorService/areaBasedList";
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("serviceKey", apiKey)
                .queryParam("areaCode", "1")  // Code for Seoul
                .queryParam("numOfRows", "20")  // Adjust as needed
                .queryParam("pageNo", "1")
                .queryParam("MobileOS", "ETC")
                .queryParam("MobileApp", "YourAppName")
                .queryParam("_type", "json");

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uriBuilder.toUriString(), String.class);
    }
}
