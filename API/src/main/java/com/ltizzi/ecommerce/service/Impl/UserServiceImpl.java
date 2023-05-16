package com.ltizzi.ecommerce.service.Impl;

import com.ltizzi.ecommerce.exception.InvalidUserException;
import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.model.user.UserRequest;
import com.ltizzi.ecommerce.model.user.UserResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import com.ltizzi.ecommerce.repository.UserRepository;
import com.ltizzi.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<UserResponse> getUsers() {
        return userMapper.toArrayUserResponse(userRepo.findAll());
    }

    @Override
    public CountTable countUsers() {
        long totalUsers = userRepo.countBy();
        return new CountTable((int) totalUsers);
    }

    @Override
    public UserResponse getUserById(Long id) throws HttpClientErrorException.NotFound {
        return userMapper.toUserResponse(userRepo.findById(id).orElseThrow());
    }

    @Override
    public UserResponse saveUser(UserRequest user) throws InvalidUserException {
        UserEntity newUser = userRepo.save(userMapper.toUserEntity(user));
        return userMapper.toUserResponse(newUser);
    }

    @Override
    public void deleteUserById(Long id) throws HttpClientErrorException.NotFound {
        userRepo.deleteById(id);
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest user) throws HttpClientErrorException.NotFound, InvalidUserException {
        user.setUser_id(id);
        UserEntity updatedUser = userRepo.save(userMapper.toUserEntity(user));
        return userMapper.toUserResponse(updatedUser);
    }
}
