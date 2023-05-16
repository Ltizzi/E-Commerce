package com.ltizzi.ecommerce.controller;

import com.ltizzi.ecommerce.exception.InvalidStockException;
import com.ltizzi.ecommerce.model.stock.StockRequest;
import com.ltizzi.ecommerce.model.stock.StockResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import com.ltizzi.ecommerce.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@RestController
@RequestMapping("/stock")
public class StockController {

    @Autowired
    private StockService stockServ;

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<StockResponse>> getStocks() {
        return new ResponseEntity<>(stockServ.getStocks(), HttpStatus.OK);
    }

    @GetMapping("/count")
    @ResponseBody
    public ResponseEntity<CountTable> countStocks() {
        return new ResponseEntity<>(stockServ.countStocks(), HttpStatus.OK);
    }

    @GetMapping("/byId")
    @ResponseBody
    public ResponseEntity<StockResponse> getStockById(@RequestParam Long stock_id) {
        return new ResponseEntity<>(stockServ.getStockById(stock_id), HttpStatus.OK);
    }

    @PostMapping("/new")
    @ResponseBody
    public ResponseEntity<StockResponse> saveStock(@RequestBody StockRequest stockRequest) throws InvalidStockException {
        return new ResponseEntity<>(stockServ.saveStock(stockRequest), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteStock(@RequestParam Long stock_id) {
        stockServ.deleteStockById(stock_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/update")
    @ResponseBody
    public ResponseEntity<StockResponse> updateStock(@RequestParam Long stock_id, @RequestBody StockRequest stockReq) throws InvalidStockException {
        return new ResponseEntity<>(stockServ.updateStock(stock_id, stockReq), HttpStatus.OK);
    }
}
