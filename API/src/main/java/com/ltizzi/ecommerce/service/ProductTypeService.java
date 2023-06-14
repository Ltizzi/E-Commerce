package com.ltizzi.ecommerce.service;


import com.ltizzi.ecommerce.exception.InvalidProductTypeException;
import com.ltizzi.ecommerce.model.productType.ProductTypeRequest;
import com.ltizzi.ecommerce.model.productType.ProductTypeResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;


/**
 * @author Leonardo Terlizzi
 */


public interface ProductTypeService {

    public List<ProductTypeResponse> getProductTypes(int page, int limit);

    public CountTable countTypes();

    public ProductTypeResponse getProductTypeById(Long id) throws HttpClientErrorException.NotFound;

    public ProductTypeResponse saveProductType(ProductTypeRequest product) throws InvalidProductTypeException;

    public void deleteProductTypeById(Long id) throws HttpClientErrorException.NotFound;

    public ProductTypeResponse updateProductType(Long product_id, ProductTypeRequest product) throws HttpClientErrorException.NotFound, InvalidProductTypeException;
}
