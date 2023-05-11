import { ProductType } from './type';

export interface Product {
  id?: number;
  name: string;
  brand: string;
  about: string;
  imageUrl: Array<string>;
  price: number;
  prod_type: ProductType;
}
