package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.exception.InvalidPurchaseException;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderRequest;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderResponse;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface ShopOrderService {

    public List<ShopOrderResponse> getShopOrders() throws HttpClientErrorException.NotFound;

    public List<ShopOrderResponse> getShopOrdersByUserId(Long id) throws HttpClientErrorException.NotFound;

    public ShopOrderResponse getShopOrderById(Long id) throws HttpClientErrorException.NotFound;

    public ShopOrderResponse saveShopOrder(CartResponse cartRes) throws InvalidPurchaseException;

    public void deleteShopOrderById(Long id) throws HttpClientErrorException.NotFound;

    public ShopOrderResponse updateShopOrder(Long id, ShopOrderRequest shopOrder) throws HttpClientErrorException.NotFound, InvalidPurchaseException;
}
