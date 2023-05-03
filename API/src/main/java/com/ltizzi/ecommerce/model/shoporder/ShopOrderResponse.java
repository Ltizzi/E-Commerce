package com.ltizzi.ecommerce.model.shoporder;

import com.ltizzi.ecommerce.model.cart.CartItem;
import com.ltizzi.ecommerce.model.user.UserResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Data @NoArgsConstructor
public class ShopOrderResponse {

    private Long shop_order_id;
    private BigDecimal total;
    private ArrayList<CartItem> items = new ArrayList<>();
    private Long user_id;
    private String order_state;

}
