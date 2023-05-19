package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.exception.InvalidCartException;
import com.ltizzi.ecommerce.exception.NotFoundException;
import com.ltizzi.ecommerce.model.cart.CartEntity;
import com.ltizzi.ecommerce.model.cart.CartRequest;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface CartService {

    public List<CartResponse> getCarts();

    public CartResponse getCartById(Long id) throws HttpClientErrorException.NotFound;


    public CartResponse saveCart(CartRequest cart) throws InvalidCartException, NotFoundException;

    public void deleteCart(Long id) throws HttpClientErrorException.NotFound;

    public CartResponse updateCart(Long id, CartRequest cart) throws InvalidCartException;

    public List<CartResponse> findCartsByUserId(Long user_id) throws NotFoundException;


}
