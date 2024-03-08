import { ProductType } from './type';

export interface Product {
  product_id?: number;
  name: string;
  brand: string;
  about: string;
  imageUrl: Array<string>;
  price: number;
  type: ProductType;
  rating: number;
  total_reviews: number;
}
