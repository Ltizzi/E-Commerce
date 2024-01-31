import { ProductTypeRequest } from "./productType.request";

export interface ProductRequest {
  product_id?: number;
  name: string;
  brand: string;
  about: string;
  imageUrl: Array<string>;
  price: number;
  type: ProductTypeRequest;
}
