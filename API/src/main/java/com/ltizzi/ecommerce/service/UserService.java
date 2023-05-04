package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.model.user.UserRequest;
import com.ltizzi.ecommerce.model.user.UserResponse;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface UserService {

    public List<UserRequest> getUsers();

    public UserRequest getUserById(Long id);

    public UserRequest saveUser(UserResponse user);

    public void deleteUserById(Long id);

    public UserRequest updateUser(Long id, UserResponse user);
}
