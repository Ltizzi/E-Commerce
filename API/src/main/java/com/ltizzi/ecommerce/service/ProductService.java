package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.model.product.ProductRequest;
import com.ltizzi.ecommerce.model.product.ProductResponse;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface ProductService {

    public List<ProductRequest> getProducts();

    public ProductRequest getProductById(Long id);

    public ProductRequest saveProduct(ProductResponse product);

    public void deleteProductById(Long id);

    public ProductRequest updateProduct(Long product_id, ProductResponse product);
}
