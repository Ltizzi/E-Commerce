import { Product } from "./Product";
import { Stock } from "./Stock";

export interface StockEntry {
  entry_id: number;
  product: Product;
  cantidad: number;
  stock: Stock;
  stock_id: number;
  createdAt: Date;
  updatedAt: Date;
  soft_delete: boolean;
}
