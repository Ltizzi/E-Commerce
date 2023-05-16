package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.exception.InvalidUserException;
import com.ltizzi.ecommerce.model.user.UserRequest;
import com.ltizzi.ecommerce.model.user.UserResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface UserService {

    public List<UserResponse> getUsers();

    public CountTable countUsers();

    public UserResponse getUserById(Long id) throws HttpClientErrorException.NotFound;

    public UserResponse saveUser(UserRequest user) throws InvalidUserException;

    public void deleteUserById(Long id) throws HttpClientErrorException.NotFound;

    public UserResponse updateUser(Long id, UserRequest user) throws HttpClientErrorException.NotFound, InvalidUserException;
}
