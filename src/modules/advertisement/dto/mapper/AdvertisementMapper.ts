import { FullAdvertisement } from "../../../../types/advertisement.types";
import { CategoryMapper } from "../../../category/dto/mapper/CategoryMapper";
import { UserMapper } from "../../../users/dto/mapper/UserMapper";
import { ResponseAdvertisementDto } from "../ResponseAdvertisementDto";
import { AdvertisementAddressMapper } from "./AdvertisementAddressMapper";

export class AdvertisementMapper {
  static toResponseDto(ad:FullAdvertisement): ResponseAdvertisementDto {
    
    const { advertisementAddress, user, category, images} = ad;
    const userResponse = UserMapper.toResponseDto(user);
    const addressResponse = AdvertisementAddressMapper.toResponseDto(advertisementAddress);
    const categoryResponse = CategoryMapper.toResponseDto(category);

    const dto: ResponseAdvertisementDto = {
      id: ad.id,
      title: ad.title,
      description: ad.description,
      price: ad.price,
      amount: ad.amount,
      unitOfMeasure: ad.unitOfMeasure,
      status: ad.status,
      isDonation: ad.isDonation,
      user: userResponse,
      category: categoryResponse,
      advertisementAddress: addressResponse,
      images,
    };
    return dto;
  }
}
