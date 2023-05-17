package com.ltizzi.ecommerce.controller;

import com.ltizzi.ecommerce.exception.InvalidProductTypeException;
import com.ltizzi.ecommerce.model.productType.ProductTypeRequest;
import com.ltizzi.ecommerce.model.productType.ProductTypeResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import com.ltizzi.ecommerce.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@RestController
@RequestMapping("/type")
public class ProductTypeController {

    @Autowired
    private ProductTypeService typeServ;

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<ProductTypeResponse>> getTypes(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "" + Integer.MAX_VALUE) int limit) {
        return new ResponseEntity<>(typeServ.getProductTypes(page, limit), HttpStatus.OK);
    }

    @GetMapping("/count")
    @ResponseBody
    public ResponseEntity<CountTable> countTypes() {
        return new ResponseEntity<>(typeServ.countTypes(), HttpStatus.OK);
    }

    @GetMapping("/byId")
    @ResponseBody
    public ResponseEntity<ProductTypeResponse> getTypeById(@RequestParam Long type_id) {
        return new ResponseEntity<>(typeServ.getProductTypeById(type_id), HttpStatus.OK);
    }

    @PostMapping("/new")
    @ResponseBody
    public ResponseEntity<ProductTypeResponse> saveType(@RequestBody ProductTypeRequest typeRequest) throws InvalidProductTypeException {
        return new ResponseEntity<>(typeServ.saveProductType(typeRequest), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteType(@RequestParam Long type_id) {
        typeServ.deleteProductTypeById(type_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/update")
    @ResponseBody
    public ResponseEntity<ProductTypeResponse> updateType(@RequestParam Long type_id, @RequestBody ProductTypeRequest typeRequest) throws InvalidProductTypeException {
        return new ResponseEntity<>(typeServ.updateProductType(type_id, typeRequest), HttpStatus.OK);
    }
}
