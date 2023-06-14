package com.ltizzi.ecommerce.model.shoporder;

import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Data
@NoArgsConstructor
public class ShopOrderResponse {

    private Long shop_order_id;
    private BigDecimal total;
    private int cantidad;
    private ProductResponse product;
    private Long user_id;
    private String order_state;

}
