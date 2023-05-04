package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.productType.ProductTypeRequest;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface ProductTypeService {

    public List<ProductTypeRequest> getProductTypes();

    public ProductTypeRequest getProductTypeById(Long id);

    public ProductTypeRequest saveProductType(ProductResponse product);

    public void deleteProductTypeById(Long id);

    public ProductTypeRequest updateProductType(Long product_id, ProductResponse product);
}
