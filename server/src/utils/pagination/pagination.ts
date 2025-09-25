import { PaginationQueryBase, PaginationParamsBase, Order, AdvertisementPaginationParams} from './pagination.types';
import { AdvertisementPaginationQuery } from './pagination.schema';

export function getPaginationParams(query: PaginationQueryBase): PaginationParamsBase {
  const page = parseInt(query.page ?? "1"); 
  const limit = parseInt(query.limit ?? "10");
  const order: Order = (query.order as Order) || "desc";

  return { page, limit, order };
}

export function parseAdvertisementPaginationParams(query: AdvertisementPaginationQuery): AdvertisementPaginationParams {

 const basePageParams = getPaginationParams(query);
 const priceMax = query.priceMax ? parseFloat(query.priceMax): undefined;
 const categoryId = query.categoryId;
 const text = query.text;

  return { ...basePageParams, priceMax, categoryId, text};
}
