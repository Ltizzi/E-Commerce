import { ProductTypeResponse } from "./productType.response";

export interface ProductResponse {
  product_id: number;
  name: string;
  brand: string;
  about: string;
  imageUrl: Array<string>;
  price: number;
  type: ProductTypeResponse;
  rating: number;
  total_reviews: number;
}
