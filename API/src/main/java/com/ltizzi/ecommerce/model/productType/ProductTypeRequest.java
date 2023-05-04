package com.ltizzi.ecommerce.model.productType;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Leonardo Terlizzi
 */

@Data @NoArgsConstructor
public class ProductTypeRequest {

    private Long id;
    private String name;
}
