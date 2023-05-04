package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.model.stock.StockRequest;
import com.ltizzi.ecommerce.model.stock.StockResponse;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface StockService {

    public List<StockRequest> getStocks();

    public StockRequest getStockById(Long id);

    public StockRequest saveStock(StockResponse stock);

    public void deleteStockById(Long id);

    public StockRequest updateStock(Long id, StockResponse stock);
}
