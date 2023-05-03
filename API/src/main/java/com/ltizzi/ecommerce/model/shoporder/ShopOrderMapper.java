package com.ltizzi.ecommerce.model.shoporder;

import org.springframework.stereotype.Component;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class ShopOrderMapper {


    public ShopOrderResponse toShopOrderResponse(ShopOrderEntity order){
        ShopOrderResponse orderRes = new ShopOrderResponse();
        orderRes.setShop_order_id(order.getShop_order_id());
        orderRes.setItems(order.getItems());
        orderRes.setTotal(order.getTotal());
        orderRes.setOrder_state(order.getOrder_state());
        orderRes.setUser_id(order.getUser().getUser_id());
        return orderRes;
    }
}
