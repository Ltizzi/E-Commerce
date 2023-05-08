package com.ltizzi.ecommerce.service.Impl;

import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.product.ProductRequest;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.productType.ProductTypeMapper;
import com.ltizzi.ecommerce.model.stock.StockEntity;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryEntity;
import com.ltizzi.ecommerce.repository.ProductRepository;
import com.ltizzi.ecommerce.repository.StockRepository;
import com.ltizzi.ecommerce.service.ProductService;
import com.ltizzi.ecommerce.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * @author Leonardo Terlizzi
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository prodRepo;

    @Autowired
    private StockRepository stockRepo;

    @Autowired
    private ProductMapper prodMapper;

    @Autowired
    private ProductTypeMapper typeMapper;


    @Override
    public List<ProductResponse> getProducts() {
        return prodMapper.toArrayProductResponse((ArrayList<ProductEntity>) prodRepo.findAll());
    }

    @Override
    public ProductResponse getProductById(Long id) {
        return prodMapper.toProductResponse(Objects.requireNonNull(prodRepo.findById(id).orElseThrow()));
    }

    @Override
    public ProductResponse saveProduct(ProductRequest prodReq) {
        ProductEntity product = prodRepo.save(prodMapper.toProductEntity(prodReq));

        //stock business logic
        StockEntity stock = new StockEntity();
        stock.setProduct(product);
        stock.setCantidad(0);
        stock.setEntries(new ArrayList<StockEntryEntity>());
        stockRepo.save(stock);

        return prodMapper.toProductResponse(product);
    }

    @Override
    public void deleteProductById(Long id) {
        ProductEntity product = prodRepo.findById(id).orElseThrow();
        StockEntity stock = stockRepo.findByProduct(product);
        prodRepo.deleteById(id);
        if (stock != null) {
            stockRepo.deleteById(stock.getStock_id());
        }
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest prodReq) {
        ProductEntity product = prodRepo.findById(id).orElseThrow();
        product.setName(prodReq.getName());
        product.setBrand(prodReq.getBrand());
        product.setPrice(prodReq.getPrice());
        product.setAbout(prodReq.getAbout());
        product.setProduct_type(typeMapper.toProductTypeEntity(prodReq.getProd_type()));
        product.setImageUrl(prodReq.getImageUrl());
        product = prodRepo.save(product);
        return prodMapper.toProductResponse(product);
    }
}
