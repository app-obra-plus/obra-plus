
export type OrderField = "created_at" | "price" | "distance";
export type OrderDirection = "asc" | "desc";
export interface OrderBy {
  field?: OrderField
  direction?: OrderDirection
}

export interface PaginationQueryBase {
  page?: string;
  limit?: string;
  orderField?: string;
  orderDirection?: string;
}

export interface PaginationParamsBase {
  page: number;
  limit: number;
  order?: OrderBy;
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

export interface UserAdvertisementParams extends PaginationParamsBase {
  priceMax?: number;
  categoryId?: string;
  text?: string;
}