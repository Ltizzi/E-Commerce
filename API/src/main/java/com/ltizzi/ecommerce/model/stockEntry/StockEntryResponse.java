package com.ltizzi.ecommerce.model.stockEntry;

import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.stock.StockResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Leonardo Terlizzi
 */

@Data
@NoArgsConstructor
public class StockEntryResponse {

    private Long entry_id;
    private ProductResponse product;
    private int cantidad;
    private StockResponse stock;
}
