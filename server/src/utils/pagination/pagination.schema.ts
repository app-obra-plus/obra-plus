import { z } from "zod";

export const AdvertisementPaginationQuerySchema = z
  .object({
    page: z.string().optional(),
    limit: z.string().optional(),
    order: z.enum(["asc", "desc"]).optional(),
    priceMax: z.string().optional(),
    categoryId: z.string().optional(),
    text: z.string().optional(),
  })
  .strict();

export type AdvertisementPaginationQuery = z.infer<typeof AdvertisementPaginationQuerySchema>;
