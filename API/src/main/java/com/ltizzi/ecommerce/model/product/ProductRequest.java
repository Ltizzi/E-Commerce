package com.ltizzi.ecommerce.model.product;

import com.ltizzi.ecommerce.model.productType.ProductTypeRequest;
import com.ltizzi.ecommerce.model.productType.ProductTypeResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Data
@NoArgsConstructor
public class ProductRequest {

    private Long product_id;
    private String name;
    private String brand;
    private String about;
    private ArrayList<String> imageUrl = new ArrayList<>();
    private BigDecimal price;
    private ProductTypeRequest prod_type;
}
