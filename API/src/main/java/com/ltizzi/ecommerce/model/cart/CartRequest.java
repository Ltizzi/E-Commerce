package com.ltizzi.ecommerce.model.cart;

import com.ltizzi.ecommerce.model.product.ProductRequest;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * @author Leonardo Terlizzi
 */
@Data
@NoArgsConstructor
public class CartRequest {

    private BigDecimal total;
    private ProductRequest product;
    private Long user_id;
}
