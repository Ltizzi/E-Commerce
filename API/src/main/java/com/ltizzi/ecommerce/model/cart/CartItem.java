package com.ltizzi.ecommerce.model.cart;

import com.ltizzi.ecommerce.model.product.ProductResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * @author Leonardo Terlizzi
 */
@Data @NoArgsConstructor
public class CartItem {

    private int cantidad;
    private ProductResponse product;
    private BigDecimal total;
}
