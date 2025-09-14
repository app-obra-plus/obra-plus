export type Order = "asc" | "desc";

export interface PaginationQuery {
  page?: string;  
  limit?: string;
  order?: string;
}

export interface PaginationParams {
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

export function getPaginationParams(query: PaginationQuery): PaginationParams {
  const page = parseInt(query.page ?? "1"); 
  const limit = parseInt(query.limit ?? "10");
  const order: Order = (query.order as Order) || "desc";

  return { page, limit, order };
}
