package com.green.jaeyoon.goodmorning.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity// Marks this class as a JPA entity representing a table in the database.
@AllArgsConstructor// Generates a constructor with all fields.
@NoArgsConstructor// Generates a no-arguments constructor.
@Getter// Generates a no-arguments constructor.
@Builder// Allows using the Builder pattern for creating instances.
@ToString// Generates a toString() method for easy object representation.
@Table(name = "tbl_cart_item", indexes = {// Specifies the table name and indexes for optimization.
        @Index(columnList = "cart_cno", name = "idx_cartitem_cart"),
        // Index on the "cart_cno" column.
        @Index(columnList = "product_pno, cart_cno", name= "idx_cartitem_pno_cart")
        // Composite index on "product_pno" and "cart_cno".
})

//=====================================================================
//This CartItem entity owns the quality of "product and quantity(qty)"
// and creates the table in a Many-to-One relationship under the name "tbl_cart_item"

//Needs index to determine if the specific item is in the item cart
//=====================================================================

public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cino;

    @ManyToOne// Indicates a Many-to-One relationship with the Product entity.
    @JoinColumn(name = "product_pno")// Foreign key colum linking to the Product entity.
    private Product product;// The product associated with this cart item.

    @ManyToOne// Indicates a Many-to-One relationship with the Cart entity.
    @JoinColumn(name = "cart_cno")// Foreign key colum linking to the Cart entity /
    private Cart cart; //Cart that contains this item.

    private int qty; // The quantity of the product in the cart.

    public void changeQty(int qty) { //Method to update the quantity of the cart item
        this.qty = qty; //Sets the quantity to the new value
    }
}
