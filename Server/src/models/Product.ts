import { ProductType } from "./ProductType";

export interface Product {
  product_id: number;
  name: string;
  brand: string;
  about: string;
  imageUrl: Array<string>;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  soft_delete: boolean;
  type: ProductType;
}
