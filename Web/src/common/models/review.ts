export interface Review {
  review_id?: number;
  user_id: number;
  product_id: number;
  rating: number;
  text: string;
}
