package com.ltizzi.ecommerce.model.purchase;

import com.ltizzi.ecommerce.model.shoporder.ShopOrderResponse;
import com.ltizzi.ecommerce.model.user.UserResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Array;
import java.sql.Timestamp;
import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Data @NoArgsConstructor
public class PurchaseResponse {

    private Long purchase_id;
    private ArrayList<ShopOrderResponse> orders = new ArrayList<>();
    private Long user_id;
    private Timestamp createdAt;

}
