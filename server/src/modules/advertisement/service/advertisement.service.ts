import { prisma } from "../../../database/client";
import { CreateAdvertisementDto } from "../dto/CreateAdvertisementDto";
import { AdvertisementMapper } from "../dto/mapper/AdvertisementMapper";
import { AdvertisementStatus } from "../../../generated/prisma";
import { EntityNotFoundError } from "../../../exception/EntityNotFoundError";
import { CategoryService } from "../../category/category.service";
import { UpdateAdvertisementDto } from "../dto/UpdateAdvertisementDto";
import { ResponseAdvertisementDto } from "../dto/ResponseAdvertisementDto";
import { AdvertisementImageService } from "./advertisementImage.service";
import { AdvertisementAddressService } from "./advertisementAddress.service";
import { PaginatedResponse, AdvertisementPaginationParams } from '../../../utils/pagination/pagination.types';

export class AdvertisementService {
  private readonly categoryService = new CategoryService();
  private readonly advertisementImageService = new AdvertisementImageService();
  private readonly advertisementAddressService =
    new AdvertisementAddressService();

  async createAdvertisement(
    advertisement: CreateAdvertisementDto,
    userId: string
  ) {
    const advertisementAddressDb =
      await this.advertisementAddressService.saveAdvertisementAddress(
        advertisement.addressId
      );
    await this.categoryService.getCategoryById(advertisement.category_id);

    const data = {
      title: advertisement.title,
      description: advertisement.description,
      price: advertisement.price,
      isDonation: advertisement.isDonation,
      category_id: advertisement.category_id,
      amount: advertisement.amount,
      unitOfMeasure: advertisement.unitOfMeasure,
      user_id: userId,
      advertisementAddressId: advertisementAddressDb.id,
    };
    const advertisementDb = await prisma.advertisement.create({ data });

    const response = AdvertisementMapper.toResponseDto(advertisementDb, []);
    return response;
  }

  async getAdvertisementbyId(id: string) {
    const advertisementDb = await prisma.advertisement.findUnique({
      where: {
        id: id,
        status: AdvertisementStatus.ACTIVE,
      },
    });

    if (!advertisementDb) {
      throw new EntityNotFoundError("Anúncio", id);
    }

    const images = await this.advertisementImageService.getImages(id);
    const response = AdvertisementMapper.toResponseDto(advertisementDb, images);

    return response;
  }

  async updateAdvertisement(id: string, dto: UpdateAdvertisementDto) {
    await this.getAdvertisementbyId(id);
    const updatedAdvertisement = await prisma.advertisement.update({
      where: { id: id },
      data: dto,
    });
    const images = await this.advertisementImageService.getImages(id);
    const response: ResponseAdvertisementDto =
      AdvertisementMapper.toResponseDto(updatedAdvertisement, images);
    return response;
  }

  async getAdvertisementsPage(
    params: AdvertisementPaginationParams
  ): Promise<PaginatedResponse<ResponseAdvertisementDto>> {
    const { page, limit, order, priceMax, categoryId } = params;
    const skip = (page - 1) * limit;

    const whereClause = {
      isDeleted: false,
      ...(priceMax !== undefined && { price: { lte: priceMax } }),
      ...(categoryId && { category_id: categoryId }),
    };

    const [advertisements, total] = await Promise.all([
      prisma.advertisement.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { created_at: order },
      }),
      prisma.advertisement.count({
        where: whereClause,
      }),
    ]);

    const advertisementResponse = await Promise.all(
      advertisements.map(async (ad) => {
        const images = await this.advertisementImageService.getImages(ad.id);
        return AdvertisementMapper.toResponseDto(ad, images);
      })
    );

    return {
      data: advertisementResponse,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
