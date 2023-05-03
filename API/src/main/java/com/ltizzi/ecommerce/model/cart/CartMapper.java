package com.ltizzi.ecommerce.model.cart;

import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.model.user.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author Leonardo Terlizzi
 */
@Component
public class CartMapper {

//    @Autowired
//    private UserMapper userMapper;


    public CartResponse toCartResponse(CartEntity cart) {
        CartResponse cartRes = new CartResponse();
        cartRes.setId(cartRes.getId());
        cartRes.setTotal(cart.getTotal());
        cartRes.setItems(cart.getItems());
        cartRes.setUser_id(cart.getUser().getUser_id());
        return cartRes;
    }
}
