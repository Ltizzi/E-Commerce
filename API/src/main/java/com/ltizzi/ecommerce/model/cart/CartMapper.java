package com.ltizzi.ecommerce.model.cart;

import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.model.user.UserResponse;
import com.ltizzi.ecommerce.repository.CartRepository;
import com.ltizzi.ecommerce.repository.ProductRepository;
import com.ltizzi.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author Leonardo Terlizzi
 */
@Component
public class CartMapper {

//    @Autowired
//    private UserMapper userMapper;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ProductRepository prodRepo;

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private UserRepository userRepo;


    public CartResponse toCartResponse(CartEntity cart) {
        CartResponse cartRes = new CartResponse();
        cartRes.setId(cart.getCart_id());
        cartRes.setTotal(cart.getTotal());
        cartRes.setCantidad(cart.getCantidad());
        ProductResponse prod = productMapper.toProductResponse(cart.getProduct());
        cartRes.setProduct(prod);
        cartRes.setUser_id(cart.getUser().getUser_id());
        return cartRes;
    }

    public CartEntity toCartEntity(CartRequest cartReq) {
        CartEntity cart = new CartEntity();
        if (cartReq.getId() != null) {
            cart = cartRepo.findById(cartReq.getId()).orElseThrow();

        }
        cart.setUser(userRepo.findById(cartReq.getUser_id()).orElse(null));
        cart.setCantidad(cartReq.getCantidad());
        cart.setTotal(cartReq.getTotal());
        Long id = cartReq.getProduct().getId();
        Optional<ProductEntity> product = prodRepo.findById(id);
        cart.setProduct(product.get());
        return cart;
    }

    public CartEntity toCartEntity(CartResponse cartRes) {
        CartEntity cart = new CartEntity();
        if (cartRes.getId() != null) {
            cart = cartRepo.findById(cartRes.getId()).orElseThrow();
        }
        cart.setUser(userRepo.findById(cartRes.getUser_id()).orElse(null));
        cart.setCantidad(cartRes.getCantidad());
        cart.setTotal(cartRes.getTotal());
        Long id = cartRes.getProduct().getId();
        Optional<ProductEntity> product = prodRepo.findById(id);
        cart.setProduct(product.get());
        return cart;
    }

    public List<CartResponse> toArrayCartResponse(List<CartEntity> carts) {
        List<CartResponse> cartsRes = new ArrayList<>();
        carts.forEach(cart -> {
            cartsRes.add(toCartResponse(cart));
        });
        return cartsRes;
    }

    public List<CartEntity> toArrayCartEntity(List<CartRequest> cartsReq) {
        List<CartEntity> carts = new ArrayList<>();
        cartsReq.forEach(cart -> {
            carts.add(toCartEntity(cart));
        });
        return carts;
    }

    public List<CartEntity> toArrayCartEntityFromResponse(List<CartResponse> cartsRes) {
        List<CartEntity> carts = new ArrayList<>();
        cartsRes.forEach(cart -> {
            carts.add(toCartEntity(cart));
        });
        return carts;
    }
}
