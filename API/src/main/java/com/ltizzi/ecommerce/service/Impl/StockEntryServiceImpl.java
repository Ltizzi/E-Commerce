package com.ltizzi.ecommerce.service.Impl;

import com.ltizzi.ecommerce.exception.InvalidStockEntryException;
import com.ltizzi.ecommerce.exception.NotFoundException;
import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.stock.StockEntity;
import com.ltizzi.ecommerce.model.stock.StockMapper;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryEntity;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryMapper;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryRequest;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import com.ltizzi.ecommerce.repository.StockEntryRepository;
import com.ltizzi.ecommerce.repository.StockRepository;
import com.ltizzi.ecommerce.service.StockEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@Service
public class StockEntryServiceImpl implements StockEntryService {

    @Autowired
    private StockEntryRepository entryRepo;

    @Autowired
    private StockEntryMapper entryMapper;

    @Autowired
    private StockRepository stockRepo;
    @Autowired
    private StockMapper stockMapper;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<StockEntryResponse> getStockEntries(int page, int limit) {
        PageRequest pageReq = PageRequest.of(page, limit);
        Page<StockEntryEntity> entryPage = entryRepo.findAll(pageReq);
        List<StockEntryEntity> entryList = entryPage.getContent();
        return entryMapper.toArrayStockEntryResponse(entryList);
    }

    @Override
    public CountTable countEntries() {
        long totalEntries = entryRepo.countBy();
        return new CountTable((int) totalEntries);
    }

    @Override
    public StockEntryResponse getStockEntryById(Long id) throws NotFoundException {
        return entryMapper.toStockEntryResponse(entryRepo.findById(id).orElseThrow());
    }

    @Override
    public StockEntryResponse saveStockEntry(StockEntryRequest stockEntry) throws InvalidStockEntryException {
        StockEntryEntity entry = entryRepo.save(entryMapper.toStockEntryEntity(stockEntry));

        //update stock's quantity
        StockEntity stock = entry.getStock();
        stock.setCantidad(stock.getCantidad() + stockEntry.getCantidad());
        List<StockEntryEntity> entries = stock.getEntries();
        entries.add(entry);
        stock.setEntries(entries);
        stockRepo.save(stock);

        return entryMapper.toStockEntryResponse(entry);
    }

    @Override
    public void deleteStockEntryById(Long id) throws NotFoundException {
        StockEntryEntity entry = entryRepo.findById(id).orElseThrow();

        //remueve cantidad del stock si se borra la entrada
        StockEntity stock = entry.getStock();
        stock.setCantidad(stock.getCantidad() - entry.getCantidad());
        stockRepo.save(stock);

        entryRepo.deleteById(id);
    }

    @Override
    public StockEntryResponse updateStockEntry(Long id, StockEntryRequest stockEntry) throws NotFoundException, InvalidStockEntryException {
        StockEntryEntity oldEntry = entryRepo.findById(id).orElseThrow();
        int oldQuantity = oldEntry.getCantidad();
        int newQuantity = stockEntry.getCantidad();

        StockEntity stock = oldEntry.getStock();
        stock.setCantidad(stock.getCantidad() - oldQuantity);
        stock.setCantidad(stock.getCantidad() + newQuantity);
        List<StockEntryEntity> entries = stock.getEntries();

        entries.add(entryMapper.toStockEntryEntity(stockEntry));

        stock.setEntries(entries);

        stockRepo.save(stock);

        stockEntry.setEntry_id(id);
        StockEntryEntity newEntry = entryRepo.save(entryMapper.toStockEntryEntity(stockEntry));
        return entryMapper.toStockEntryResponse(newEntry);
    }
}
