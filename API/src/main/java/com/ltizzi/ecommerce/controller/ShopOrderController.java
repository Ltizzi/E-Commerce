package com.ltizzi.ecommerce.controller;

import com.ltizzi.ecommerce.exception.InvalidShopOrderException;
import com.ltizzi.ecommerce.model.cart.CartRequest;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderRequest;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderResponse;
import com.ltizzi.ecommerce.service.ShopOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@RestController
@RequestMapping("/order")
public class ShopOrderController {

    @Autowired
    private ShopOrderService orderServ;

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<ShopOrderResponse>> getOrders() {
        return new ResponseEntity<>(orderServ.getShopOrders(), HttpStatus.OK);
    }

    @GetMapping("/byId")
    @ResponseBody
    public ResponseEntity<ShopOrderResponse> getOrderById(@RequestParam Long order_id) {
        return new ResponseEntity<>(orderServ.getShopOrderById(order_id), HttpStatus.OK);
    }

    @GetMapping("/byUser")
    @ResponseBody
    public ResponseEntity<List<ShopOrderResponse>> getOrdersByUser(@RequestParam Long user_id) {
        return new ResponseEntity<>(orderServ.getShopOrdersByUserId(user_id), HttpStatus.OK);
    }

    @PostMapping("/new")
    @ResponseBody
    public ResponseEntity<ShopOrderResponse> saveOrder(@RequestBody CartRequest cartRequest) throws InvalidShopOrderException {
        return new ResponseEntity<>(orderServ.saveShopOrder(cartRequest), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteOrder(@RequestParam Long order_id) {
        orderServ.deleteShopOrderById(order_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/update")
    @ResponseBody
    public ResponseEntity<ShopOrderResponse> updateOrder(@RequestParam Long order_id, @RequestBody ShopOrderRequest orderRequestt) throws InvalidShopOrderException {
        return new ResponseEntity<>(orderServ.updateShopOrder(order_id, orderRequestt), HttpStatus.OK);
    }

}
