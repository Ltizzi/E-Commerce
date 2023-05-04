package com.ltizzi.ecommerce.model.cart;

import com.ltizzi.ecommerce.model.product.ProductResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Data @NoArgsConstructor
public class CartResponse {

    private Long id;
    private BigDecimal total;
    private ProductResponse product;
  //  private UserResponse user;
    private Long user_id;
}
