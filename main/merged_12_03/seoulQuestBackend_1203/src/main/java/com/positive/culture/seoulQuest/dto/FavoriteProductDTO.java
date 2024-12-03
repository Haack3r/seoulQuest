package com.positive.culture.seoulQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteProductDTO {

    private Long fino;                 // ID of the favorite entry, renamed to match frontend parameter
    private String email;              // Member email for identification
    private Long pno;                  // Product ID, matching ProductDTO's `pno`

    // Product-related fields, names aligned with ProductDTO
    private String pname;              // Product name
    private String pdesc;              // Product description
    private int pprice;                // Product price
    private int pqty;                  // Available quantity of the product
    private List<String> uploadFileNames; // List of product image file names, matching ProductDTO

    private LocalDateTime addedAt;     // Date when the favorite was added
}
