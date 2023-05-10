package com.ltizzi.ecommerce.model.user;

import com.ltizzi.ecommerce.model.cart.CartMapper;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.purchase.PurchaseMapper;
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
public class UserMapper {

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private PurchaseMapper purchaseMapper;

    @Autowired
    private UserRepository userRepo;

    public UserResponse toUserResponse(UserEntity user) {
        UserResponse userRes = new UserResponse();
        userRes.setUser_id(user.getUser_id());
        userRes.setUsername(user.getUsername());
        userRes.setName(user.getName());
        userRes.setLastname(user.getLastname());
        userRes.setEmail(user.getEmail());
        List<CartResponse> carts = cartMapper.toArrayCartResponse(user.getCarts());
        userRes.setCarts(carts);
        userRes.setAvatar(user.getAvatar());
        userRes.setBirthday(user.getBirthday());
        userRes.setPurchases(purchaseMapper.toArrayPurchaseResponse(user.getPurchases()));

        return userRes;
    }

    public UserEntity toUserEntity(UserRequest userReq) throws HttpClientErrorException.NotFound {
        UserEntity user = new UserEntity();
        if (userReq.getUser_id() != null) {
            user = userRepo.findById(userReq.getUser_id()).orElseThrow();
        }
        user.setAvatar(userReq.getAvatar());
        user.setBirthday(userReq.getBirthday());
        user.setCarts(cartMapper.toArrayCartEntity(userReq.getCarts()));
        user.setEmail(userReq.getEmail());
        user.setName(userReq.getName());
        user.setLastname(userReq.getLastname());
        user.setUsername(userReq.getUsername());
        user.setPurchases(purchaseMapper.toArrayPurchaseEntity(userReq.getPurchases()));

        return user;
    }

    public List<UserResponse> toArrayUserResponse(List<UserEntity> users) {
        List<UserResponse> usersReq = new ArrayList<>();
        users.forEach(user -> {
            usersReq.add(toUserResponse(user));
        });
        return usersReq;
    }
}
