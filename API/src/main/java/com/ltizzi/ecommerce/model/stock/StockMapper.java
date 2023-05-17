package com.ltizzi.ecommerce.model.stock;

import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryMapper;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryResponse;
import com.ltizzi.ecommerce.repository.ProductRepository;
import com.ltizzi.ecommerce.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class StockMapper {

    @Autowired
    private ProductMapper prodMapper;

    @Autowired
    private ProductRepository prodRepo;

    @Autowired
    private StockEntryMapper entryMapper;

    @Autowired
    private StockRepository stockRepo;

    public StockResponse toStockResponse(StockEntity stock) {
        StockResponse stockRes = new StockResponse();
        stockRes.setStock_id(stock.getStock_id());

        ProductResponse product = prodMapper.toProductResponse(stock.getProduct());
        stockRes.setProduct(product);
        stockRes.setCantidad(stock.getCantidad());
//        List<StockEntryResponse> entries = entryMapper.toArrayStockEntryResponse(stock.getEntries());
//        stockRes.setEntries(entries);
        return stockRes;
    }

    public StockEntity toStockEntity(StockRequest stockReq) {
        StockEntity stock = new StockEntity();
        if (stockReq.getStock_id() != null) {
            stock = stockRepo.findById(stockReq.getStock_id()).orElseThrow();
            assert stock != null;
            stock.setStock_id(stockReq.getStock_id());
        }

        stock.setCantidad(stockReq.getCantidad());
        stock.setEntries(entryMapper.toArrayStockEntryEntity(stockReq.getEntries()));
        ProductEntity product = prodRepo.findById(stockReq.getProduct().getId()).orElseThrow();
        stock.setProduct(product);
        return stock;
    }

    public List<StockResponse> toArrayStockResponse(List<StockEntity> stocks) {
        List<StockResponse> stocksRes = new ArrayList<>();
        stocks.forEach(stock -> {
            stocksRes.add(toStockResponse(stock));
        });
        return stocksRes;
    }
}
