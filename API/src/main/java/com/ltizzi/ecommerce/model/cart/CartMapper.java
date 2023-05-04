package com.ltizzi.ecommerce.model.cart;

import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.model.user.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */
@Component
public class CartMapper {

//    @Autowired
//    private UserMapper userMapper;

        @Autowired
        private ProductMapper productMapper;


    public CartResponse toCartResponse(CartEntity cart) {
        CartResponse cartRes = new CartResponse();
        cartRes.setId(cartRes.getId());
        cartRes.setTotal(cart.getTotal());
        ProductResponse prod = productMapper.toProductResponse(cart.getProduct());
        cartRes.setProduct(prod);
        cartRes.setUser_id(cart.getUser().getUser_id());
        return cartRes;
    }

    public ArrayList<CartResponse> toArrayCartResponse(ArrayList<CartEntity> carts) {
        ArrayList<CartResponse> cartsRes = new ArrayList<>();
        carts.forEach(cart -> {
            cartsRes.add(toCartResponse(cart));
        });
        return cartsRes;
    }
}
