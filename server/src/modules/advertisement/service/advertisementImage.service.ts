import { prisma } from "../../../database/client";
import { PutBlobResult } from "@vercel/blob";
import { BadRequestError } from "../../../exception/BadRequestError";
import { ImageService } from "../../../infra/blob/image.service";
import { ImageMapper } from "../dto/mapper/ImageMapper";

export class AdvertisementImageService {
  private readonly imageService = new ImageService();

  async saveMultipleImages(
    advertisementId: string,
    uploadedImages: PutBlobResult[]
  ) {
    const data = uploadedImages.map((img) => ({
      url: img.url,
      advertisement_id: advertisementId,
      pathname: img.pathname,
    }));

    const imagesDb = await prisma.image.createMany({ data });
    return imagesDb;
  }

  async deleteImageById(imageId: string) {
    const image = await prisma.image.findUnique({ where: { id: imageId } });

    if (!image) {
      throw new BadRequestError("Imagem não encontrada");
    }

    await this.imageService.deleteBlob(image.pathname);
    await prisma.image.delete({
      where: {
        id: imageId,
      },
    });
  }

  async getImages(advertisementId: string) {
    const imagesDb = await prisma.image.findMany({
      where: { advertisement_id: advertisementId },
    });

    const imagesResponse = imagesDb.map((img) =>
      ImageMapper.toResponseDto(img)
    );
    return imagesResponse;
  }
}
