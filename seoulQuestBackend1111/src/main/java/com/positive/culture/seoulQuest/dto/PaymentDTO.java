package com.positive.culture.seoulQuest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {

    @JsonProperty("orderDTO")
    private OrderDTO orderDTO;

    private LocalDateTime paymentDate;

}
