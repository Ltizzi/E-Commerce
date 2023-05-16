package com.ltizzi.ecommerce.controller;

import com.ltizzi.ecommerce.exception.InvalidUserException;
import com.ltizzi.ecommerce.model.user.UserRequest;
import com.ltizzi.ecommerce.model.user.UserResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import com.ltizzi.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userServ;

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<UserResponse>> getUsers(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "" + Integer.MAX_VALUE) int limit) {
        return new ResponseEntity<>(userServ.getUsers(page, limit), HttpStatus.OK);
    }

    @GetMapping("/count")
    @ResponseBody
    public ResponseEntity<CountTable> countUsers() {
        return new ResponseEntity<>(userServ.countUsers(), HttpStatus.OK);
    }

    @GetMapping("/byId")
    @ResponseBody
    public ResponseEntity<UserResponse> getUserById(@RequestParam Long user_id) {
        return new ResponseEntity<>(userServ.getUserById(user_id), HttpStatus.OK);
    }

    @PostMapping("/new")
    @ResponseBody
    public ResponseEntity<UserResponse> saveUser(@RequestBody UserRequest userRequest) throws InvalidUserException {
        return new ResponseEntity<>(userServ.saveUser(userRequest), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteUser(@RequestParam Long user_id) {
        userServ.deleteUserById(user_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/update")
    @ResponseBody
    public ResponseEntity<UserResponse> updateUser(@RequestParam Long user_id, @RequestBody UserRequest userReq) throws InvalidUserException {
        return new ResponseEntity<>(userServ.updateUser(user_id, userReq), HttpStatus.OK);
    }
}
