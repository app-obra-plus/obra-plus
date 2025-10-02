import { Image } from "../../../../generated/prisma";
import { ResponseImageDto } from "../ImageResponseDto";

export class ImageMapper {
  static toResponseDto(img: Image): ResponseImageDto {
    const dto: ResponseImageDto = {
      id: img.id,
      url: img.url,
    };
    return dto;
  }
}
