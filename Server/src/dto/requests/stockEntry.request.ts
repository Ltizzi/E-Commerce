import { ProductRequest } from "./product.request";
import { StockRequest } from "./stock.request";

export interface StockEntryRequest {
  entry_id?: number;
  cantidad: number;
  //product: ProductRequest;
  stock: StockRequest;
  stock_id: number;
}
