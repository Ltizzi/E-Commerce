import { ProductResponse } from "../../dto/responses/product.response";
import { Product } from "../Product";

export interface FavResponse {
  userFavs: Array<ProductResponse>;
  action: string;
}
