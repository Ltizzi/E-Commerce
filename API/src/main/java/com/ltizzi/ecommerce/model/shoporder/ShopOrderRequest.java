package com.ltizzi.ecommerce.model.shoporder;

import com.ltizzi.ecommerce.model.cart.CartRequest;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * @author Leonardo Terlizzi
 */

@Data @NoArgsConstructor
public class ShopOrderRequest {

    private Long shop_order_id;
    private BigDecimal total;
    private CartRequest cart;
    private Long user_id;
    private String order_state;
}
