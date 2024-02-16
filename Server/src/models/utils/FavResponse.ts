import { Product } from "../Product";

export interface FavResponse {
  userFavs: Array<Product>;
  action: string;
}
