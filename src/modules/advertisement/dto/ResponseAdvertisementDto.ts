import { AdvertisementStatus } from "../../../generated/prisma";
import { CategoryResponseDto } from "../../category/dto/ResponseCategoryDto";
import { UserResponseDto } from "../../users/dto/UserResponseDto";
import { ResponseImageDto } from "./ImageResponseDto";
import { ResponseAdvertisementAddressDto } from "./ResponseAdvertisementAddressDto";

export interface ResponseAdvertisementDto {
  id: string;
  title: string;
  description: string;
  price: number;
  status: AdvertisementStatus;
  isDonation: boolean;
  user: UserResponseDto;
  category: CategoryResponseDto;
  advertisementAddress: ResponseAdvertisementAddressDto;
  images: ResponseImageDto[];
}
