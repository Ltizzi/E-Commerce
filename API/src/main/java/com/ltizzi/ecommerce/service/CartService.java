package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.model.cart.CartEntity;
import com.ltizzi.ecommerce.model.cart.CartRequest;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface CartService {

    public List<CartResponse> getCarts();

    public CartResponse getCartById(Long id);

    public CartRequest saveCart(CartResponse cart);

    public void deleteCart(Long id);

    public CartRequest updateCart(Long id, CartResponse cart);

    public List<CartRequest> findCartsByUserId(Long user_id);




    }
