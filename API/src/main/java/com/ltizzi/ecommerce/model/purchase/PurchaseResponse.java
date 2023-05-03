package com.ltizzi.ecommerce.model.purchase;

import com.ltizzi.ecommerce.model.shoporder.ShopOrderResponse;
import com.ltizzi.ecommerce.model.user.UserResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/**
 * @author Leonardo Terlizzi
 */

@Data @NoArgsConstructor
public class PurchaseResponse {

    private Long purchase_id;
    private ShopOrderResponse order;
    private Long user_id;
    private Timestamp createdAt;

}
