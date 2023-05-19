package com.ltizzi.ecommerce.model.shoporder;

import com.ltizzi.ecommerce.model.cart.CartRequest;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.product.ProductRequest;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * @author Leonardo Terlizzi
 */

@Data
@NoArgsConstructor
public class ShopOrderRequest {

    private Long shop_order_id;
    private BigDecimal total;
    private int cantidad;
    private ProductRequest product;
    private Long user_id;
    private String order_state;
}
