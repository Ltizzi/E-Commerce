package com.ltizzi.ecommerce.model.stock;

import com.ltizzi.ecommerce.model.product.ProductRequest;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryRequest;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */
@Data @NoArgsConstructor
public class StockRequest {

    private Long stock_id;
    private ProductRequest product;
    private int cantidad;
    private ArrayList<StockEntryRequest> entries = new ArrayList<>();
}
