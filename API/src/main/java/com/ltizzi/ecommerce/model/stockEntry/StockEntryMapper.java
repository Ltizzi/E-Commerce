package com.ltizzi.ecommerce.model.stockEntry;

import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.stock.StockMapper;
import com.ltizzi.ecommerce.model.stock.StockResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class StockEntryMapper {

    @Autowired
    private ProductMapper prodMapper;

    @Autowired
    private StockMapper stockMapper;

    public StockEntryResponse toStockEntryResponse(StockEntryEntity entry){
        StockEntryResponse entryRes = new StockEntryResponse();
        entryRes.setEntry_id(entry.getEntry_id());
        ProductResponse prod = prodMapper.toProductResponse(entry.getProduct());
        entryRes.setProduct(prod);
        StockResponse stock = stockMapper.toStockResponse(entry.getStock());
        entryRes.setStock(stock);
        return entryRes;
    }

    public ArrayList<StockEntryResponse> toArrayStockEntryResponse(ArrayList<StockEntryEntity> entries){
        ArrayList<StockEntryResponse> entriesRes = new ArrayList<>();
        entries.forEach(entry -> {
            entriesRes.add(toStockEntryResponse(entry));
        });
        return entriesRes;
    }
}
