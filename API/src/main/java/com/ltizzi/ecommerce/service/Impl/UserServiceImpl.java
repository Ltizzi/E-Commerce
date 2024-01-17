package com.ltizzi.ecommerce.service.Impl;

import com.ltizzi.ecommerce.exception.InvalidUserException;
import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.model.user.UserRequest;
import com.ltizzi.ecommerce.model.user.UserResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import com.ltizzi.ecommerce.repository.UserRepository;
import com.ltizzi.ecommerce.service.UserService;
import com.ltizzi.ecommerce.utils.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    public List<UserResponse> getUsers(int page, int limit) {
        PageRequest pageReq = PageRequest.of(page, limit);
        Page<UserEntity> usersPage = userRepo.findAll(pageReq);
        List<UserEntity> usersList = usersPage.getContent();
        return userMapper.toArrayUserResponse(usersList);
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
    public UserEntity getUserByEmail(String email) throws HttpClientErrorException.NotFound {
        return userRepo.findByEmail(email);
    }

    @Override
    public UserResponse saveUser(UserRequest user) throws InvalidUserException {
//        UserEntity newUser = userRepo.save(userMapper.toUserEntity(user));
        List<Role> roles = new ArrayList<>();
        roles.add(Role.USER);
        user.setRoles(roles);
        return userMapper.toUserResponse(userRepo.save(userMapper.toUserEntity(user)));
    }

    @Override
    public UserResponse createNewUser(Map<String, Object> userInfo) throws InvalidUserException {
        UserEntity newUser = new UserEntity();
        List<Role> roles = new ArrayList<>();
        roles.add(Role.USER);
        newUser.setRoles(roles);
        String email = (String) userInfo.get("email");
        int indexOfArroba = email.indexOf("@");
        newUser.setGoogleId((Long) userInfo.get("sub"));
        newUser.setEmail(email);
        newUser.setName((String) userInfo.get("given_name"));
        newUser.setLastname((String) userInfo.get("family_name"));
        newUser.setUsername(email.substring(0, indexOfArroba));
        newUser.setAvatar((String) userInfo.get("picture"));
        return userMapper.toUserResponse(userRepo.save(newUser));
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

    @Override
    public UserResponse addRoleToUser(UserEntity user, Role role) throws InvalidUserException {
        List<Role> roles = user.getRoles();
        if (!roles.contains(role)) {
            roles.add(role);
            user.setRoles(roles);
            UserEntity updatedUser = userRepo.save(user);
            return userMapper.toUserResponse(updatedUser);
        } else throw new InvalidUserException("Can't add role to user");
    }
}
