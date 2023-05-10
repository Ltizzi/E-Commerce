package com.ltizzi.ecommerce.model.stockEntry;

import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.stock.StockEntity;
import com.ltizzi.ecommerce.model.stock.StockMapper;
import com.ltizzi.ecommerce.model.stock.StockResponse;
import com.ltizzi.ecommerce.repository.ProductRepository;
import com.ltizzi.ecommerce.repository.StockEntryRepository;
import com.ltizzi.ecommerce.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class StockEntryMapper {

    @Autowired
    private ProductMapper prodMapper;

    @Autowired
    private ProductRepository prodRepo;

    @Autowired
    private StockRepository stockRepo;

    @Autowired
    private StockMapper stockMapper;

    @Autowired
    private StockEntryRepository entryRepo;

    public StockEntryResponse toStockEntryResponse(StockEntryEntity entry) {
        StockEntryResponse entryRes = new StockEntryResponse();
        entryRes.setEntry_id(entry.getEntry_id());
        // ProductResponse prod = prodMapper.toProductResponse(entry.getProduct());
        // entryRes.setProduct(prod);
        entryRes.setCantidad(entry.getCantidad());
        StockResponse stock = stockMapper.toStockResponse(entry.getStock());
        entryRes.setStock(stock);
        return entryRes;
    }

    public StockEntryEntity toStockEntryEntity(StockEntryRequest entryReq) {
        StockEntryEntity stockEntry = new StockEntryEntity();
        if (entryReq.getEntry_id() != null) {
            stockEntry = entryRepo.findById(entryReq.getEntry_id()).orElse(new StockEntryEntity());
            stockEntry.setEntry_id(entryReq.getEntry_id());
        }
//        ProductEntity product = prodRepo.findById(entryReq.getStock().getProduct().getId()).orElseThrow();
//        stock.setProduct(product);
        stockEntry.setCantidad(entryReq.getCantidad());
        StockEntity stock = stockRepo.findById(entryReq.getStock().getStock_id()).orElseThrow();
        stockEntry.setStock(stock);
        return stockEntry;
    }

    public List<StockEntryResponse> toArrayStockEntryResponse(List<StockEntryEntity> entries) {
        List<StockEntryResponse> entriesRes = new ArrayList<>();
        entries.forEach(entry -> {
            entriesRes.add(toStockEntryResponse(entry));
        });
        return entriesRes;
    }

    public List<StockEntryEntity> toArrayStockEntryEntity(List<StockEntryRequest> entriesReq) {
        List<StockEntryEntity> entries = new ArrayList<>();
        entriesReq.forEach(entryReq -> {
            entries.add(toStockEntryEntity(entryReq));
        });
        return entries;
    }
}
