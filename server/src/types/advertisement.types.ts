import { Prisma } from "../generated/prisma";

export type FullAdvertisement = Prisma.AdvertisementGetPayload<{
  include: {
    user: true;
    advertisementAddress: true;
    category: true;
    images: true;
  };
}>;