import { ProductResponse } from "./product.response";
import { StockEntryResponse } from "./stockEntry.response";

export interface StockResponse {
  stock_id: number;
  product: ProductResponse;
  entries: Array<StockEntryResponse>;
  cantidad: number;
}
