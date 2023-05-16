package com.ltizzi.ecommerce.service.Impl;

import com.ltizzi.ecommerce.exception.InvalidStockException;
import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.stock.StockEntity;
import com.ltizzi.ecommerce.model.stock.StockMapper;
import com.ltizzi.ecommerce.model.stock.StockRequest;
import com.ltizzi.ecommerce.model.stock.StockResponse;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryMapper;
import com.ltizzi.ecommerce.model.utils.CountTable;
import com.ltizzi.ecommerce.repository.StockRepository;
import com.ltizzi.ecommerce.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


/**
 * @author Leonardo Terlizzi
 */
@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepository stockRepo;

    @Autowired
    private StockMapper stockMapper;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private StockEntryMapper entryMapper;

    @Override
    public List<StockResponse> getStocks(int page, int limit) {
        PageRequest pageReq = PageRequest.of(page, limit);
        Page<StockEntity> stockPage = stockRepo.findAll(pageReq);
        List<StockEntity> stockList = stockPage.getContent();
        return stockMapper.toArrayStockResponse(stockList);
    }

    @Override
    public CountTable countStocks() {
        long totalStocks = stockRepo.countBy();
        return new CountTable((int) totalStocks);
    }

    @Override
    public StockResponse getStockById(Long id) {
        return stockMapper.toStockResponse(Objects.requireNonNull(stockRepo.findById(id).orElseThrow()));
    }

    @Override
    public StockResponse saveStock(StockRequest stock) {
        stock.setCantidad(0);
        StockEntity newStock = stockRepo.save(stockMapper.toStockEntity(stock));
        return stockMapper.toStockResponse(newStock);
    }

    @Override
    public void deleteStockById(Long id) {
        stockRepo.deleteById(id);
    }

    @Override
    public StockResponse updateStock(Long id, StockRequest stockReq) {
        StockEntity stock = stockRepo.findById(stockReq.getStock_id()).orElseThrow();
        ;
        stock.setCantidad(stockReq.getCantidad());
        stock.setProduct(productMapper.toProductEntity(stockReq.getProduct()));
        stock.setEntries(entryMapper.toArrayStockEntryEntity(stockReq.getEntries()));
        stock = stockRepo.save(stock);
        return stockMapper.toStockResponse(stock);
    }
}
