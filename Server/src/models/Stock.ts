import { Product } from "./Product";
import { StockEntry } from "./StockEntry";

export interface Stock {
  stock_id: number;
  product: Product;
  product_id: number;
  cantidad: number;
  entries: Array<StockEntry>;
  createdAt: Date;
  updatedAt: Date;
  soft_delete: boolean;
}
