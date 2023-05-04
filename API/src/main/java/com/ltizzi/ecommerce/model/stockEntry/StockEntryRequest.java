package com.ltizzi.ecommerce.model.stockEntry;

import com.ltizzi.ecommerce.model.product.ProductRequest;
import com.ltizzi.ecommerce.model.stock.StockRequest;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Leonardo Terlizzi
 */
@Data @NoArgsConstructor
public class StockEntryRequest {

    private Long entry_id;
    private ProductRequest product;
    private int cantidad;
    private StockRequest stock;
}
