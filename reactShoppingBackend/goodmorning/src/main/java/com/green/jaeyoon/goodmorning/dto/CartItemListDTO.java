package com.green.jaeyoon.goodmorning.dto;

import com.green.jaeyoon.goodmorning.domain.CartItem;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Generates getter, setter, toString, equals, and hashCode methods for the class.
@Builder // Enables the Builder design pattern for creating instances of this class.

@NoArgsConstructor // Generates a no-arguments constructor.

//==========================================================================================
// Purpose:
// The CartItemListDTO class serves as DTO
// for transferring detailed information about cart items in a list format.
// It encapsulates attributes like cart item ID, quantity, product ID,
// product name, price, and image file.
// This DTO is useful for displaying cart item details to users and for data manipulation
// in various application layers, such as controllers and services.
//==========================================================================================
// The data that is transferred to the controller is the data of the items in the cart, quantity,
// and the image files of the specific user.
//==========================================================================================

public class CartItemListDTO { // Data Transfer Object for a list of cart items

    private Long cino; // Cart item number (ID).
    private int qty; // Quantity of the product in the cart.
    private Long pno; // Product number (ID).
    private String pname; // Name of the product.
    private int price; // Price of the product.
    private String imageFile; // File name or path of the product image.

    // Constructor to initialize all fields.
    public CartItemListDTO(Long cino, int qty, Long pno, String pname, int price, String imageFile) {
        this.cino = cino;
        this.qty = qty;
        this.pno = pno;
        this.pname = pname;
        this.price = price;
        this.imageFile = imageFile;
    }
    //This DTO is using "Projection" method, which the dto creates constructor itself using JPQL
}
