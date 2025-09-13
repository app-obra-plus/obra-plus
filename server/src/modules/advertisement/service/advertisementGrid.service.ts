import { prisma } from "../../../database/client";
import {
  AdvertisementMapQueryDto,
  SubGrid,
  SubGridResponse,
} from "../dto/AdvertisementMapQueryDto";
import { AdvertisementAddressService } from "./advertisementAddress.service";

export class AdvertisementGridService {
  private readonly advertisementAddressService = new AdvertisementAddressService();

  async getAdvertisementGridFilter(
    dto: AdvertisementMapQueryDto
  ): Promise<SubGridResponse[]> {
    const { latitudeStep, longitudeStep } = this.getGridCellDimensions(dto);
    const subGrids = this.generateSubGrids(dto, latitudeStep, longitudeStep);

    const result: SubGridResponse[] = [];
    for (const subGrid of subGrids) {
      const advertisements = await this.getAdvertisementBySubGrid(subGrid, dto);
      const advertisementIds = advertisements.map((a) => a.id);

      if (advertisementIds.length > 1) {
        result.push({
          latitudeCenter: subGrid.latitudeCenter,
          longitudeCenter: subGrid.longitudeCenter,
          advertisementIds,
        });
      } else if (advertisementIds.length === 1) {
        const address =
          await this.advertisementAddressService.getAdvertisementAddressById(
            advertisements[0].advertisementAddressId
          );

        result.push({
          latitudeCenter: address.latitude,
          longitudeCenter: address.longitude,
          advertisementIds,
        });
      }
    }

    return result;
  }

  private getGridCellDimensions(dto: AdvertisementMapQueryDto) {
    const latitudeStep =
      (dto.boundingBox.maxLatitude - dto.boundingBox.minLatitude) /
      dto.resolution;
    const longitudeStep =
      (dto.boundingBox.maxLongitude - dto.boundingBox.minLongitude) /
      dto.resolution;

    return { latitudeStep, longitudeStep };
  }

  private generateSubGrids(
    dto: AdvertisementMapQueryDto,
    latitudeStep: number,
    longitudeStep: number
  ): SubGrid[] {
    const subGrids: SubGrid[] = [];

    for (let i = 0; i < dto.resolution; i++) {
      for (let j = 0; j < dto.resolution; j++) {
        const subBoundingBox = {
          minLatitude: dto.boundingBox.minLatitude + i * latitudeStep,
          maxLatitude: dto.boundingBox.minLatitude + (i + 1) * latitudeStep,
          minLongitude: dto.boundingBox.minLongitude + j * longitudeStep,
          maxLongitude: dto.boundingBox.minLongitude + (j + 1) * longitudeStep,
        };
        const latitudeCenter =
          (subBoundingBox.maxLatitude + subBoundingBox.minLatitude) / 2;
        const longitudeCenter =
          (subBoundingBox.maxLongitude + subBoundingBox.minLongitude) / 2;
        subGrids.push({
          latitudeCenter,
          longitudeCenter,
          subBoundingBox,
          advertisementIds: [],
        });
      }
    }

    return subGrids;
  }

  private async getAdvertisementBySubGrid(
    subGrid: SubGrid,
    dto: AdvertisementMapQueryDto
  ) {
    const ads = await prisma.advertisement.findMany({
      where: {
        advertisementAddress: {
          latitude: {
            gte: subGrid.subBoundingBox.minLatitude,
            lte: subGrid.subBoundingBox.maxLatitude,
          },
          longitude: {
            gte: subGrid.subBoundingBox.minLongitude,
            lte: subGrid.subBoundingBox.maxLongitude,
          },
          isDeleted: false,
        },
        isDeleted: false,
        status: "ACTIVE",
        ...(dto.filter?.categoryId && { category_id: dto.filter.categoryId }),
        ...(dto.filter?.priceMax && { price: { lte: dto.filter.priceMax } }),
      },
      select: { id: true, advertisementAddressId: true },
    });

    return ads;
  }
}
