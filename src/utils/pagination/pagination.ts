import { PaginationQueryBase, PaginationParamsBase, AdvertisementPaginationParams, UserAdvertisementParams, OrderDirection, OrderField, PaginationMeta } from './pagination.types';
import { AdvertisementPaginationQuery, UserAdvertisementQuery } from './pagination.schema';

export function getPaginationParams(query: PaginationQueryBase): PaginationParamsBase {
  const page = Number.parseInt(query.page ?? "1"); 
  const limit = Number.parseInt(query.limit ?? "10");
  const field: OrderField = (query.orderField as OrderField );
  const direction: OrderDirection = (query.orderDirection as OrderDirection );
  const order= {field: field, direction: direction }

  return { page, limit, order};
}

export function parseAdvertisementPaginationParams(query: AdvertisementPaginationQuery): AdvertisementPaginationParams {

 const basePageParams = getPaginationParams(query);
 const priceMax = query.priceMax ? Number.parseFloat(query.priceMax): undefined;
 const categoryId = query.categoryId;
 const text = query.text;
 const distanceMax = Number.parseFloat(query.distanceMax)
 const userLatitude =  Number.parseFloat(query.userLatitude);
 const userLongitude =  Number.parseFloat(query.userLongitude);

  return { 
    ...basePageParams, 
    priceMax, 
    categoryId, 
    text, 
    distanceMax,
    userLatitude,
    userLongitude
  };
}

export function parseUserAdvertisementParams(
  query: UserAdvertisementQuery
): UserAdvertisementParams {
  const basePageParams = getPaginationParams(query);
  const priceMax = query.priceMax ? Number.parseFloat(query.priceMax) : undefined;
  const categoryId = query.categoryId;
  const text = query.text;

  return {
    ...basePageParams,
    priceMax,
    categoryId,
    text,
  };
}

export function buildPagination(
  params: { total: number; page: number; limit: number }
): PaginationMeta {
  const { total, page, limit } = params;
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}