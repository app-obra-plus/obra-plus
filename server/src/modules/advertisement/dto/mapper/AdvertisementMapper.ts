import { Advertisement } from "../../../../generated/prisma";
import { ResponseImageDto } from "../ImageResponseDto";
import { ResponseAdvertisementDto } from "../ResponseAdvertisementDto";

export class AdvertisementMapper {
  static toResponseDto(
    ad: Advertisement,
    images: ResponseImageDto[]
  ): ResponseAdvertisementDto {
    const dto: ResponseAdvertisementDto = {
      id: ad.id,
      title: ad.title,
      description: ad.description,
      price: ad.price,
      status: ad.status,
      isDonation: ad.isDonation,
      user_id: ad.user_id,
      category_id: ad.category_id,
      advertisementAddressId: ad.advertisementAddressId,
      images,
    };
    return dto;
  }
}
