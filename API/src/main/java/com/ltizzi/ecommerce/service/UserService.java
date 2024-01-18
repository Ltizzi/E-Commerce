package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.exception.InvalidUserException;
import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.model.user.UserRequest;
import com.ltizzi.ecommerce.model.user.UserResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import com.ltizzi.ecommerce.utils.Role;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Map;

/**
 * @author Leonardo Terlizzi
 */


public interface UserService {

    public List<UserResponse> getUsers(int page, int limit);

    public CountTable countUsers();

    public UserResponse getUserById(Long id) throws HttpClientErrorException.NotFound;

    public UserEntity getUserByEmail(String email) throws HttpClientErrorException.NotFound;

    public UserResponse getUserByUsername(String username) throws UsernameNotFoundException;

    public UserResponse saveUser(UserRequest user) throws InvalidUserException;

    public UserResponse createNewUser(Map<String, Object> userInfo) throws InvalidUserException;

    public UserResponse addRoleToUser(UserEntity user, Role role) throws InvalidUserException;

    public void deleteUserById(Long id) throws HttpClientErrorException.NotFound;

    public UserResponse updateUser(Long id, UserRequest user) throws HttpClientErrorException.NotFound, InvalidUserException;
}
