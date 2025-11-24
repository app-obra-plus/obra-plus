import { z } from "zod";
export interface AdvertisementWithAddress {
  id: string;
  advertisementAddress: {
    latitude: number;
    longitude: number;
  };
}

export interface SimplifiedAdLocation {
  id: string;
  lat: number;
  lng: number;
}

export const GeoPointSchema = z.object({
  lat: z.coerce.number().refine(val => val >= -90 && val <= 90, {
    message: "Latitude deve estar entre -90 e 90"
  }),
  lng: z.coerce.number().refine(val => val >= -180 && val <= 180, {
    message: "Longitude deve estar entre -180 e 180"
  })
});

export type GeoPoint = z.infer<typeof GeoPointSchema>;