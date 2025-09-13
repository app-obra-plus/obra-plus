import { AdvertisementStatus } from "../../../generated/prisma";
import { ResponseImageDto } from "./ImageResponseDto";

export interface ResponseAdvertisementDto {
  id: string;
  title: string;
  description: string;
  price: number;
  status: AdvertisementStatus;
  isDonation: boolean;
  user_id: string;
  category_id: string;
  advertisementAddressId: string;
  images: ResponseImageDto[];
}
