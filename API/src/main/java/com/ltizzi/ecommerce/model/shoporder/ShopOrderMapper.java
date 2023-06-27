package com.ltizzi.ecommerce.model.shoporder;

import com.ltizzi.ecommerce.model.cart.CartEntity;
import com.ltizzi.ecommerce.model.cart.CartMapper;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.repository.CartRepository;
import com.ltizzi.ecommerce.repository.ProductRepository;
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
    private ProductMapper prodMapper;

    @Autowired
    private ProductRepository prodRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ShopOrderRepository orderRepo;


    public ShopOrderResponse toShopOrderResponse(ShopOrderEntity order) {
        ShopOrderResponse orderRes = new ShopOrderResponse();
        orderRes.setShop_order_id(order.getShop_order_id());
        ProductEntity prod = prodRepo.findById(order.getProduct().getProduct_id()).get();
        orderRes.setProduct(prodMapper.toProductResponse(prod));
        orderRes.setCantidad(order.getCantidad());
        orderRes.setTotal(order.getTotal());
        orderRes.setOrder_state(order.getOrder_state());
        orderRes.setUser_id(order.getUser().getUser_id());
        return orderRes;
    }

    public ShopOrderEntity toShopOrderEntity(ShopOrderRequest orderReq) throws HttpClientErrorException.NotFound {
        ShopOrderEntity newOrder = new ShopOrderEntity();
        if (orderReq.getShop_order_id() != null) {
            newOrder = orderRepo.findById(orderReq.getShop_order_id()).get();
        }
        newOrder.setUser(userRepo.findById(orderReq.getUser_id()).get());
        newOrder.setOrder_state(orderReq.getOrder_state());
        newOrder.setProduct(prodMapper.toProductEntity(orderReq.getProduct()));
        newOrder.setCantidad(orderReq.getCantidad());
        newOrder.setTotal(orderReq.getTotal());
        return newOrder;
    }

    public ShopOrderEntity toShopOrderEntity(ShopOrderResponse orderRes) throws HttpClientErrorException.NotFound {
        ShopOrderEntity newOrder = new ShopOrderEntity();
        if (orderRes.getShop_order_id() != null) {
            newOrder = orderRepo.findById(orderRes.getShop_order_id()).get();
        }
        newOrder.setUser(userRepo.findById(orderRes.getUser_id()).get());
        newOrder.setOrder_state(orderRes.getOrder_state());
        newOrder.setProduct(prodMapper.toProductEntity(orderRes.getProduct()));
        newOrder.setCantidad(orderRes.getCantidad());
        newOrder.setTotal(orderRes.getTotal());
        return newOrder;
    }

    public List<ShopOrderResponse> toArrayShopOrderResponse(List<ShopOrderEntity> orders) {
        List<ShopOrderResponse> ordersRes = new ArrayList<>();
        orders.forEach(order -> {
            ordersRes.add(toShopOrderResponse(order));
        });
        return ordersRes;
    }

    public List<ShopOrderEntity> toArrayShopOrderEntity(List<ShopOrderRequest> ordersReq) {
        List<ShopOrderEntity> newOrders = new ArrayList<>();
        ordersReq.forEach(orderReq -> {
            newOrders.add(toShopOrderEntity(orderReq));
        });
        return newOrders;
    }

    public List<ShopOrderEntity> toArrayShopOrderEntityFromResponse(List<ShopOrderResponse> ordersRes) {
        List<ShopOrderEntity> newOrders = new ArrayList<>();
        ordersRes.forEach(orderRes -> {
            newOrders.add(toShopOrderEntity(orderRes));
        });
        return newOrders;
    }
}
