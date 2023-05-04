package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.model.shoporder.ShopOrderRequest;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderResponse;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface ShopOrderService {

    public List<ShopOrderRequest> getShopOrders();

    public List<ShopOrderRequest> getShopOrdersByUserId(Long id);

    public ShopOrderRequest getShopOorderById(Long id);

    public ShopOrderRequest saveShopOrder(ShopOrderResponse shopOrder);

    public void deleteShopOrderById(Long id);

    public ShopOrderRequest updateShopOrder(Long id, ShopOrderResponse shopOrder);
}
