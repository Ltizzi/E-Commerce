package com.ltizzi.ecommerce.model.purchase;

import com.ltizzi.ecommerce.model.shoporder.ShopOrderRequest;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Data @NoArgsConstructor
public class PurchaseRequest {

    private Long purchase_id;
    private ArrayList<ShopOrderRequest> orders = new ArrayList<>();
    private Long user_id;
    private Timestamp createdAt;
}
