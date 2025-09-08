import { z } from "zod";
import {FilterSearchAdvertisementSchema } from './FilterSearchAdvertisementDto';

export const AdvertisementMapQuerySchema = z.object({
    resolution:z.coerce.number().nonnegative("Resolução não pode ser negativo")
    .positive("Resolução deve ser maior que zero"),
    filter: FilterSearchAdvertisementSchema.optional(),
    boundingBox: z.object({
        minLatitude: z.coerce.number(),
        maxLatitude: z.coerce.number(),
        minLongitude: z.coerce.number(),
        maxLongitude: z.coerce.number(),
    })
})

export type AdvertisementMapQueryDto = z.infer<typeof AdvertisementMapQuerySchema >;

export interface SubGrid {
    subBoundingBox:{
        minLatitude: number,
        maxLatitude: number,
        minLongitude: number,
        maxLongitude: number,
    },
    advertisementIds: string[]
 
}

export interface ResponseSubGridDto{
    subGrids: SubGrid[]
}