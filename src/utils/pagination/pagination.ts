import { PaginationQueryBase, PaginationParamsBase, AdvertisementPaginationParams, UserAdvertisementParams, OrderDirection, OrderField } from './pagination.types';
import { AdvertisementPaginationQuery, UserAdvertisementQuery } from './pagination.schema';

export function getPaginationParams(query: PaginationQueryBase): PaginationParamsBase {
  const page = parseInt(query.page ?? "1"); 
  const limit = parseInt(query.limit ?? "10");
  const field: OrderField = (query.orderField as OrderField );
  const direction: OrderDirection = (query.orderDirection as OrderDirection );
  const order= {field: field, direction: direction }

  return { page, limit, order};
}

export function parseAdvertisementPaginationParams(query: AdvertisementPaginationQuery): AdvertisementPaginationParams {

 const basePageParams = getPaginationParams(query);
 const priceMax = query.priceMax ? parseFloat(query.priceMax): undefined;
 const categoryId = query.categoryId;
 const text = query.text;
 const distanceMax = parseFloat(query.distanceMax)
 const userLatitude =  parseFloat(query.userLatitude);
 const userLongitude =  parseFloat(query.userLongitude);

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
  const priceMax = query.priceMax ? parseFloat(query.priceMax) : undefined;
  const categoryId = query.categoryId;
  const text = query.text;

  return {
    ...basePageParams,
    priceMax,
    categoryId,
    text,
  };
}