import { z } from "zod";

export const AdvertisementsBatchRequestSchema = z.object({
  ids: z.array(z.string().uuid()),
});

export type  AdvertisementsBatchRequestDto = z.infer<typeof AdvertisementsBatchRequestSchema >;