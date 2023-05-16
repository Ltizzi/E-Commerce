package com.ltizzi.ecommerce.controller;


import com.ltizzi.ecommerce.exception.InvalidPurchaseException;
import com.ltizzi.ecommerce.model.purchase.PurchaseRequest;
import com.ltizzi.ecommerce.model.purchase.PurchaseResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import com.ltizzi.ecommerce.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@RestController
@RequestMapping("/purchase")
public class PurchaseController {

    @Autowired
    private PurchaseService purchServ;

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<PurchaseResponse>> getPurchases(@RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "" + Integer.MAX_VALUE) int limit) {
        return new ResponseEntity<>(purchServ.getPurchases(page, limit), HttpStatus.OK);
    }

    @GetMapping("/count")
    @ResponseBody
    public ResponseEntity<CountTable> countPurchases() {
        return new ResponseEntity<>(purchServ.countPurchases(), HttpStatus.OK);
    }

    @GetMapping("/byId")
    @ResponseBody
    public ResponseEntity<PurchaseResponse> getPurchaseById(@RequestParam Long purchase_id) {
        return new ResponseEntity<>(purchServ.getPurchaseById(purchase_id), HttpStatus.OK);
    }

    @GetMapping("/byUser")
    @ResponseBody
    public ResponseEntity<List<PurchaseResponse>> getPurchasesByUser(@RequestParam Long user_id) {
        return new ResponseEntity<>(purchServ.getPurchaseByUserId(user_id), HttpStatus.OK);
    }

    @PostMapping("/new")
    @ResponseBody
    public ResponseEntity<PurchaseResponse> savePurchase(@RequestBody PurchaseRequest purchaseRequest) throws InvalidPurchaseException {
        return new ResponseEntity<>(purchServ.savePurchase(purchaseRequest), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deletePurchase(@RequestParam Long purchase_id) {
        purchServ.deletePurchaseById(purchase_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/update")
    @ResponseBody
    public ResponseEntity<PurchaseResponse> updatePurchase(@RequestParam Long purchase_id, @RequestBody PurchaseRequest purchaseRequest) throws InvalidPurchaseException {
        return new ResponseEntity<>(purchServ.updatePurchase(purchase_id, purchaseRequest), HttpStatus.OK);
    }
}
