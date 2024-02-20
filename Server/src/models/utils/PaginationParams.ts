//import { PaginationParams } from "./PaginationParams";
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationParamsWithUser {
  page: number;
  pageSize: number;
  user_id: number;
}

export interface PaginationParamsWithProduct {
  page: number;
  pageSize: number;
  product_id: number;
}
