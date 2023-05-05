package com.ltizzi.ecommerce.model.stockEntry;

import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.stock.StockMapper;
import com.ltizzi.ecommerce.model.stock.StockResponse;
import com.ltizzi.ecommerce.repository.StockEntryRepository;
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
    private StockMapper stockMapper;

    @Autowired
    private StockEntryRepository entryRepo;

    public StockEntryResponse toStockEntryResponse(StockEntryEntity entry){
        StockEntryResponse entryRes = new StockEntryResponse();
        entryRes.setEntry_id(entry.getEntry_id());
        ProductResponse prod = prodMapper.toProductResponse(entry.getProduct());
        entryRes.setProduct(prod);
        StockResponse stock = stockMapper.toStockResponse(entry.getStock());
        entryRes.setStock(stock);
        return entryRes;
    }

    public StockEntryEntity toStockEntryEntity(StockEntryRequest entryReq){
        StockEntryEntity stock = entryRepo.findById(entryReq.getEntry_id()).orElse(new StockEntryEntity());
        stock.setProduct(prodMapper.toProductEntity(entryReq.getProduct()));
        stock.setCantidad(entryReq.getCantidad());
        stock.setStock(stockMapper.toStockEntity(entryReq.getStock()));
        return stock;
    }

    public List<StockEntryResponse> toArrayStockEntryResponse(List<StockEntryEntity> entries){
        List<StockEntryResponse> entriesRes = new ArrayList<>();
        entries.forEach(entry -> {
            entriesRes.add(toStockEntryResponse(entry));
        });
        return entriesRes;
    }

    public List<StockEntryEntity> toArrayStockEntryEntity(List<StockEntryRequest> entriesReq) {
        List<StockEntryEntity> entries = new ArrayList<>();
        entriesReq.forEach(entryReq ->{
            entries.add(toStockEntryEntity(entryReq));
        });
        return entries;
    }
}
