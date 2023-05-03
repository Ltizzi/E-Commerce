package com.ltizzi.ecommerce.model.user;

import com.ltizzi.ecommerce.model.cart.CartMapper;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class UserMapper {

    @Autowired
    private CartMapper cartMapper;

//    @Autowired
//    private PurchaseMapper purchaseMapper;

    public UserResponse toUserResponse(UserEntity user) {
        UserResponse userRes = new UserResponse();
        userRes.setUser_id(user.getUser_id());
        userRes.setUsername(user.getUsername());
        userRes.setName(user.getName());
        userRes.setLastname(user.getLastname());
        userRes.setEmail(user.getEmail());
        CartResponse cart = cartMapper.toCartResponse(user.getCart());
        userRes.setCart(cart);
        userRes.setAvatar(user.getAvatar());
        userRes.setBirthday(user.getBirthday());
        //userRes.setPurchases(purchases);

        return userRes;
    }
}
