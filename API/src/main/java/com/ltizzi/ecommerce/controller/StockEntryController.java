package com.ltizzi.ecommerce.controller;

import com.ltizzi.ecommerce.exception.InvalidStockEntryException;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryRequest;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryResponse;
import com.ltizzi.ecommerce.service.StockEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@RestController
@RequestMapping("/entry")
public class StockEntryController {

    @Autowired
    private StockEntryService entryServ;

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<StockEntryResponse>> getEntries() {
        return new ResponseEntity<>(entryServ.getStockEntries(), HttpStatus.OK);
    }

    @GetMapping("/byId")
    @ResponseBody
    public ResponseEntity<StockEntryResponse> getEntryById(@RequestParam Long entry_id) {
        return new ResponseEntity<>(entryServ.getStockEntryById(entry_id), HttpStatus.OK);
    }

    @PostMapping("/new")
    @ResponseBody
    public ResponseEntity<StockEntryResponse> saveEntry(@RequestBody StockEntryRequest entryRequest) throws InvalidStockEntryException {
        return new ResponseEntity<>(entryServ.saveStockEntry(entryRequest), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteEntryById(@RequestParam Long entry_id) {
        entryServ.deleteStockEntryById(entry_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/update")
    @ResponseBody
    public ResponseEntity<StockEntryResponse> updateEntry(@RequestParam Long entry_id, @RequestBody StockEntryRequest entryRequest) throws InvalidStockEntryException {
        return new ResponseEntity<>(entryServ.updateStockEntry(entry_id, entryRequest), HttpStatus.OK);
    }
}
