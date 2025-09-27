export type Order = "asc" | "desc";

export interface PaginationQueryBase {
  page?: string;
  limit?: string;
  order?: string;
}

export interface PaginationParamsBase {
  page: number;
  limit: number;
  order: Order;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface AdvertisementPaginationParams extends PaginationParamsBase {
  priceMax?: number;
  categoryId?: string;
  text?: string;
  distanceMax?: number;
  userLatitude:number;
  userLongitude:number;

}
