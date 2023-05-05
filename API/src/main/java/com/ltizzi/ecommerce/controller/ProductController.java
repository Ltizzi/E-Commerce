package com.ltizzi.ecommerce.controller;

import com.ltizzi.ecommerce.exception.InvalidProductException;
import com.ltizzi.ecommerce.model.product.ProductRequest;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService prodServ;

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<ProductResponse>> getProducts() {
        return new ResponseEntity<>(prodServ.getProducts(), HttpStatus.OK);
    }

    @GetMapping("/byId")
    @ResponseBody
    public ResponseEntity<ProductResponse> getProductById(@RequestParam Long product_id) {
        return new ResponseEntity<>(prodServ.getProductById(product_id), HttpStatus.OK);
    }

    @PostMapping("/new")
    @ResponseBody
    public ResponseEntity<ProductResponse> saveProduct(@RequestBody ProductRequest productRequest) throws InvalidProductException {
        return new ResponseEntity<>(prodServ.saveProduct(productRequest), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteProduct(@RequestParam Long product_id) {
        prodServ.deleteProductById(product_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/update")
    @ResponseBody
    public ResponseEntity<ProductResponse> updateProduct(@RequestParam Long product_id, @RequestBody ProductRequest productRequest) throws InvalidProductException {
        return new ResponseEntity<>(prodServ.updateProduct(product_id, productRequest), HttpStatus.OK);
    }
}
