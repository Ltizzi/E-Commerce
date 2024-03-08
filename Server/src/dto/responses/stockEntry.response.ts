import { ProductResponse } from "./product.response";
import { StockResponse } from "./stock.response";

export interface StockEntryResponse {
  entry_id: number;
  //product: ProductResponse;
  cantidad: number;
  stock: StockResponse;
  stock_id: number;
}
