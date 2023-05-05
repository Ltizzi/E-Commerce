package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.exception.InvalidStockEntryException;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryRequest;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryResponse;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface StockEntryService {

    public List<StockEntryResponse> getStockEntries();

    public StockEntryResponse getStockEntryById(Long id) throws HttpClientErrorException.NotFound;

    public StockEntryResponse saveStockEntry(StockEntryRequest stockEntry) throws InvalidStockEntryException;

    public void deleteStockEntryById(Long id) throws HttpClientErrorException.NotFound;

    public StockEntryResponse updateStockEntry(Long id, StockEntryRequest stockEntry) throws HttpClientErrorException.NotFound, InvalidStockEntryException;

}
