package com.ltizzi.ecommerce.model.cart;

import com.ltizzi.ecommerce.model.user.UserResponse;
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
    private ArrayList<CartItem> items = new ArrayList<>();
  //  private UserResponse user;
    private Long user_id;
}
