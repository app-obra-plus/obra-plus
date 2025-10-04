import { AdvertisementStatus } from "../../../generated/prisma";
import { CategoryResponseDto } from "../../category/dto/ResponseCategoryDto";
import { UserResponseDto } from "../../users/dto/UserResponseDto";
import { UnitOfMeasureType } from "./CreateAdvertisementDto";
import { ResponseImageDto } from "./ImageResponseDto";
import { ResponseAdvertisementAddressDto } from "./ResponseAdvertisementAddressDto";

export interface ResponseAdvertisementDto {
  id: string;
  title: string;
  description: string;
  price: number;
  amount: number;
  unitOfMeasure: UnitOfMeasureType
  status: AdvertisementStatus;
  isDonation: boolean;
  user: UserResponseDto;
  category: CategoryResponseDto;
  advertisementAddress: ResponseAdvertisementAddressDto;
  images: ResponseImageDto[];
}
