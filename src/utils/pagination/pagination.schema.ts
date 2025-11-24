import { z } from "zod";


export const UserAdvertisementQuerySchema = z
  .object({
    page: z.string().optional(),
    limit: z.string().optional(),
    orderField: z.enum(["created_at", "price", "distance"]).optional(),
    orderDirection: z.enum(["asc", "desc"]).optional(),
    priceMax: z.string().optional(),
    categoryId: z.string().optional(),
    text: z.string().optional()
  })
  .strict();

export type UserAdvertisementQuery = z.infer<typeof UserAdvertisementQuerySchema>;


export const AdvertisementPaginationQuerySchema = UserAdvertisementQuerySchema.merge(
  z.object({
    distanceMax: z.string().optional(),
    userLatitude: z.string(),
    userLongitude: z.string()
  })
);
export type AdvertisementPaginationQuery = z.infer<typeof AdvertisementPaginationQuerySchema>;
