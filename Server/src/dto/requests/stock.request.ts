import { ProductRequest } from "./product.request";
import { StockEntryRequest } from "./stockEntry.request";

export interface StockRequest {
  stock_id?: number;
  product: ProductRequest;
  product_id: number;
  cantidad: number;
  entries: Array<StockEntryRequest>;
}
