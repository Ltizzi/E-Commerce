package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.exception.InvalidStockException;
import com.ltizzi.ecommerce.model.stock.StockRequest;
import com.ltizzi.ecommerce.model.stock.StockResponse;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface StockService {

    public List<StockResponse> getStocks();

    public StockResponse getStockById(Long id) throws HttpClientErrorException.NotFound;

    public StockResponse saveStock(StockRequest stock) throws InvalidStockException;

    public void deleteStockById(Long id) throws HttpClientErrorException.NotFound;

    public StockResponse updateStock(Long id, StockRequest stock) throws HttpClientErrorException.NotFound, InvalidStockException;
}
