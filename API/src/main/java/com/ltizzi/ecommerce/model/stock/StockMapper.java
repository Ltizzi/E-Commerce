package com.ltizzi.ecommerce.model.stock;

import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryMapper;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class StockMapper {

    @Autowired
    private ProductMapper prodMapper;

    @Autowired
    private StockEntryMapper entryMapper;

    public StockResponse toStockResponse(StockEntity stock) {
        StockResponse stockRes = new StockResponse();
        stockRes.setStock_id(stock.getStock_id());

        ProductResponse product = prodMapper.toProductResponse(stock.getProduct());
        stockRes.setProduct(product);
        stockRes.setCantidad(stock.getCantidad());
        ArrayList<StockEntryResponse> entries = entryMapper.toArrayStockEntryResponse(stock.getEntries());
        return stockRes;
    }
}
