package com.ltizzi.ecommerce.model.stock;

import com.ltizzi.ecommerce.model.product.ProductResponse;
import com.ltizzi.ecommerce.model.stockEntry.StockEntryResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Data
@NoArgsConstructor
public class StockResponse {

    private Long stock_id;
    private ProductResponse product;
    private int cantidad;
    //  private List<StockEntryResponse> entries = new ArrayList<>();
}
