package com.ltizzi.ecommerce.model.shoporder;

import com.ltizzi.ecommerce.model.cart.CartMapper;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class ShopOrderMapper {

    @Autowired
    private CartMapper cartMapper;


    public ShopOrderResponse toShopOrderResponse(ShopOrderEntity order){
        ShopOrderResponse orderRes = new ShopOrderResponse();
        orderRes.setShop_order_id(order.getShop_order_id());
        CartResponse cart = cartMapper.toCartResponse(order.getCart());
        orderRes.setCart(cart);
        orderRes.setTotal(order.getTotal());
        orderRes.setOrder_state(order.getOrder_state());
        orderRes.setUser_id(order.getUser().getUser_id());
        return orderRes;
    }

    public ArrayList<ShopOrderResponse> toArrayShopOrderResponse(ArrayList<ShopOrderEntity> orders) {
        ArrayList<ShopOrderResponse> ordersRes = new ArrayList<>();
        orders.forEach(order->{
            ordersRes.add(toShopOrderResponse(order));
        });
        return ordersRes;
    }
}
