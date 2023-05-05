package com.ltizzi.ecommerce.model.shoporder;

import com.ltizzi.ecommerce.model.cart.CartMapper;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.repository.ShopOrderRepository;
import com.ltizzi.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class ShopOrderMapper {

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ShopOrderRepository orderRepo;


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

    public ShopOrderEntity toShopOrderEntity(ShopOrderRequest orderReq) throws HttpClientErrorException.NotFound {
        ShopOrderEntity newOrder = orderRepo.findById(orderReq.getShop_order_id()).orElse(new ShopOrderEntity());
        newOrder.setUser(userRepo.findById(orderReq.getUser_id()).orElseThrow());
        newOrder.setOrder_state(orderReq.getOrder_state());
        newOrder.setCart(cartMapper.toCartEntity(orderReq.getCart()));
        newOrder.setTotal(orderReq.getTotal());
        return newOrder;
    }

    public List<ShopOrderResponse> toArrayShopOrderResponse(List<ShopOrderEntity> orders) {
        List<ShopOrderResponse> ordersRes = new ArrayList<>();
        orders.forEach(order->{
            ordersRes.add(toShopOrderResponse(order));
        });
        return ordersRes;
    }

    public List<ShopOrderEntity> toArrayShopOrderEntity(List<ShopOrderRequest> ordersReq) {
        List<ShopOrderEntity> newOrders = new ArrayList<>();
        ordersReq.forEach(orderReq->{
            newOrders.add(toShopOrderEntity(orderReq));
        });
        return newOrders;
    }
}
