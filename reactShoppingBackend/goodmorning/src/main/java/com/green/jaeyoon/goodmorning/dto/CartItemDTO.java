package com.green.jaeyoon.goodmorning.dto;

import lombok.Data;

@Data // Generates getter, setter, toString, equals, and hashCode methods for the class.

//=================================================================================
//Purpose:
// The CartItemDTO class serves as a DATA TRANSFER OBJECT (DTO)
// for transferring cart item data between layers of the application,
// such as from the controller to the service or from the service ti the database.
// It encapsulates the data required for managing cart items,
// providing a simple structure to hold and transmit this information.
//=================================================================================

//If the user adds the product on the product searching page, the data that will be transferred
// will be the email address of the user, the number of wanted item and the number of the item.
//If the user is modifying the number of item in the cart, the number of item in the cart (cino)
// and the number of item that wished to be modified into will be transferred.

public class CartItemDTO { // Data Transfer Object for cart items

    private String email; // Email of the user associated with the cart item.
    private Long pno; // Product number (ID) of the product.
    private int qty; // Quantity of the product in the cart.
    private Long cino; // Cart item number (ID).
}
