package com.ltizzi.ecommerce.controller;

import com.ltizzi.ecommerce.exception.InvalidCartException;
import com.ltizzi.ecommerce.exception.NotFoundException;
import com.ltizzi.ecommerce.model.cart.CartRequest;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartServ;


    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<CartResponse>> getCarts() {
        return new ResponseEntity<>(cartServ.getCarts(), HttpStatus.OK);
    }

    @GetMapping("/byId")
    @ResponseBody
    public ResponseEntity<CartResponse> getCartById(@RequestParam Long cart_id) {
        return new ResponseEntity<>(cartServ.getCartById(cart_id), HttpStatus.OK);
    }

    @GetMapping("/byUserId")
    @ResponseBody
    public ResponseEntity<List<CartResponse>> getCartsByUserId(@RequestParam Long user_id) throws NotFoundException {
        return new ResponseEntity<>(cartServ.findCartsByUserId(user_id), HttpStatus.OK);
    }

    @PostMapping("/new")
    @ResponseBody
    public ResponseEntity<CartResponse> saveCart(@RequestBody CartRequest cartRequest) throws InvalidCartException, NotFoundException {
        return new ResponseEntity<>(cartServ.saveCart(cartRequest), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteCart(@RequestParam Long cart_id) {
        cartServ.deleteCart(cart_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/update")
    @ResponseBody
    public ResponseEntity<CartResponse> updateCart(@RequestParam Long cart_id, @RequestBody CartRequest cartRequest) throws InvalidCartException {
        return new ResponseEntity<>(cartServ.updateCart(cart_id, cartRequest), HttpStatus.OK);
    }


}
