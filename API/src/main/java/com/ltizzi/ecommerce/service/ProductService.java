package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.exception.InvalidProductException;
import com.ltizzi.ecommerce.model.product.ProductRequest;
import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface ProductService {

    public List<ProductResponse> getProducts();

    public CountTable countProducts();

    public ProductResponse getProductById(Long id) throws HttpClientErrorException.NotFound;

    public ProductResponse saveProduct(ProductRequest product) throws InvalidProductException;

    public void deleteProductById(Long id) throws HttpClientErrorException.NotFound;

    public ProductResponse updateProduct(Long product_id, ProductRequest product) throws InvalidProductException, HttpClientErrorException.NotFound;
}
