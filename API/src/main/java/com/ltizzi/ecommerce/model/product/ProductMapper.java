package com.ltizzi.ecommerce.model.product;

import com.ltizzi.ecommerce.model.productType.ProductTypeMapper;
import com.ltizzi.ecommerce.model.productType.ProductTypeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class ProductMapper {

    @Autowired
    private ProductTypeMapper prodTypeMapper;


   public ProductResponse toProductResponse(ProductEntity prod) {
        ProductResponse prodRes = new ProductResponse();
        prodRes.setId(prod.getProduct_id());
        prodRes.setName(prod.getName());
        prodRes.setBrand(prod.getBrand());
        prodRes.setAbout(prod.getAbout());
        prodRes.setPrice(prod.getPrice());
        prodRes.setImageUrl(prod.getImageUrl());
        ProductTypeResponse prodType = prodTypeMapper.toProductTypeResponse(prod.getProduct_type());
        prodRes.setProd_type(prodType);
        return prodRes;
    }
}
