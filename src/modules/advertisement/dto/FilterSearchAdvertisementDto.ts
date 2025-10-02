import { z } from "zod";

export const FilterSearchAdvertisementSchema = z.object({     
  distanceMax: z.coerce.number().positive().optional(),
  categoryId: z.string().uuid().optional(),
  priceMax: z.coerce.number().nonnegative().optional(),
});

export type FilterSearchAdvertisementDto = z.infer<typeof FilterSearchAdvertisementSchema>;