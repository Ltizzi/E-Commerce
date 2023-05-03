package com.ltizzi.ecommerce.model.productType;

import org.springframework.stereotype.Component;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class ProductTypeMapper {

    public ProductTypeResponse toProductTypeResponse(ProductTypeEntity tipo) {
        ProductTypeResponse productType = new ProductTypeResponse();
        productType.setId(tipo.getProd_type_id());
        productType.setName(tipo.getName());
        return productType;
    }
}
