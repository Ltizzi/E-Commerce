import { Stock } from './stock';

export interface Entry {
  entry_id?: number;
  cantidad: number;
  stock: Stock;
  stock_id: number;
}
