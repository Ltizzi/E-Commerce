package com.ltizzi.ecommerce.service.Impl;

import com.ltizzi.ecommerce.exception.NotFoundException;
import com.ltizzi.ecommerce.model.cart.CartEntity;
import com.ltizzi.ecommerce.model.cart.CartMapper;
import com.ltizzi.ecommerce.model.cart.CartRequest;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.repository.CartRepository;
import com.ltizzi.ecommerce.repository.ProductRepository;
import com.ltizzi.ecommerce.repository.UserRepository;
import com.ltizzi.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * @author Leonardo Terlizzi
 */

@Service
public class CartServiceImpl implements CartService {


    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private ProductRepository prodRepo;

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<CartResponse> getCarts() {
        return cartMapper.toArrayCartResponse((ArrayList<CartEntity>) cartRepo.findAll());
    }

    @Override
    public CartResponse getCartById(Long id) {
        return cartMapper.toCartResponse(Objects.requireNonNull(cartRepo.findById(id).orElseThrow()));
    }

    @Override
    public List<CartResponse> findCartsByUserId(Long user_id) {
        UserEntity user = userRepo.findById(user_id).orElseThrow();
        return cartMapper.toArrayCartResponse(cartRepo.findByUser(user));
    }

    @Override
    public CartResponse saveCart(CartRequest cart) throws NotFoundException {
        ProductEntity prod = prodRepo.findById(cart.getProduct().getId()).orElseThrow();
        BigDecimal total = prod.getPrice().multiply(BigDecimal.valueOf(cart.getCantidad()));
        cart.setTotal(total);
        CartEntity newCart = cartRepo.save(cartMapper.toCartEntity(cart));
        return cartMapper.toCartResponse(newCart);
    }

    @Override
    public void deleteCart(Long id) {
        cartRepo.deleteById(id);
    }

    @Override
    public CartResponse updateCart(Long id, CartRequest cart) {
        BigDecimal total = cart.getProduct().getPrice().multiply(BigDecimal.valueOf(cart.getCantidad()));
        cart.setTotal(total);
        cart.setId(id);
        CartEntity updatedCart = cartRepo.save(cartMapper.toCartEntity(cart));
        return cartMapper.toCartResponse(updatedCart);
    }


}
