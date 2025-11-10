import { prisma } from "../../../database/client";
import { AdvertisementWithAddress, GeoPoint, SimplifiedAdLocation } from "../../../types/geo.types";
import {
  AdvertisementMapQueryDto,
  SubGrid,
  SubGridResponse,
} from "../dto/AdvertisementMapQueryDto";

export class AdvertisementGridService {

  private async getAdvertisementsForGrid(dto: AdvertisementMapQueryDto) {
    return prisma.advertisement.findMany({
      where: {
        advertisementAddress: {
          latitude: {
            gte: dto.boundingBox.minLatitude,
            lte: dto.boundingBox.maxLatitude,
          },
          longitude: {
            gte: dto.boundingBox.minLongitude,
            lte: dto.boundingBox.maxLongitude,
          },
          isDeleted: false,
        },
        isDeleted: false,
        ...(dto.filter?.categoryId && { category_id: dto.filter.categoryId }),
        ...(dto.filter?.priceMax && { price: { lte: dto.filter.priceMax } }),
      },
      select: {
        id: true,
        advertisementAddress: {
          select: {
            latitude: true,
            longitude: true,
          },
        },
      },
    });
  }

private groupAdvertisementsBySubGrid(
  subGrids: SubGrid[],
  ads: AdvertisementWithAddress[]
): Map<SubGrid, SimplifiedAdLocation[]> {
  const gridMap = new Map<SubGrid, SimplifiedAdLocation[]>();

  for (const subGrid of subGrids) {
    const adsInGrid = ads.filter((ad) => {
      const lat = ad.advertisementAddress.latitude;
      const lng = ad.advertisementAddress.longitude;
      return (
        lat >= subGrid.subBoundingBox.minLatitude &&
        lat <= subGrid.subBoundingBox.maxLatitude &&
        lng >= subGrid.subBoundingBox.minLongitude &&
        lng <= subGrid.subBoundingBox.maxLongitude
      );
    });

    if (adsInGrid.length > 0) {
      gridMap.set(
        subGrid,
        adsInGrid.map((ad) => ({
          id: ad.id,
          lat: ad.advertisementAddress.latitude,
          lng: ad.advertisementAddress.longitude,
        }))
      );
    }
  }

  return gridMap;
}

private calculateGridCenter(
  ads: GeoPoint[],
  fallback: GeoPoint
): GeoPoint {

  const totalDeAnuncios = ads.length;

  if (ads.length > 1) {
    const lat = ads.reduce((sum, a) => sum + a.lat, 0) / totalDeAnuncios;
    const lng = ads.reduce((sum, a) => sum + a.lng, 0) / totalDeAnuncios;
    return { lat, lng };
  }

  return fallback;
}

async getAdvertisementGridFilter(
  dto: AdvertisementMapQueryDto
): Promise<SubGridResponse[]> {

  const { latitudeStep, longitudeStep } = this.getGridCellDimensions(dto);
  const subGrids = this.generateSubGrids(dto, latitudeStep, longitudeStep);
  const allAdvertisement = await this.getAdvertisementsForGrid(dto);
  const grouped = this.groupAdvertisementsBySubGrid(subGrids, allAdvertisement);

  const result: SubGridResponse[] = [];

  for (const [subGrid, ads] of grouped.entries()) {
    const center = this.calculateGridCenter(ads, {
      lat: ads[0].lat,
      lng: ads[0].lng,
    });

    result.push({
      latitudeCenter: center.lat,
      longitudeCenter: center.lng,
      advertisementIds: ads.map((a) => a.id),
    });
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

}
