package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.model.stockEntry.StockEntryRequest;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryResponse;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface StockEntryService {

    public List<StockEntryRequest> getStockEntries();

    public StockEntryRequest getStockEntryById(Long id);

    public StockEntryRequest saveStockEntry(StockEntryResponse stockEntry);

    public void deleteStockEntryById(Long id);

    public StockEntryRequest updateStockEntry(Long id, StockEntryResponse stockEntry);

}
