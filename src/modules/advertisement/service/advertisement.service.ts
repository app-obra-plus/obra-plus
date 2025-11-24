import {prisma} from '../../../database/client';
import {CreateAdvertisementDto} from '../dto/CreateAdvertisementDto';
import {AdvertisementMapper} from '../dto/mapper/AdvertisementMapper';
import {Prisma} from '../../../generated/prisma';
import {EntityNotFoundError} from '../../../exception/EntityNotFoundError';
import {CategoryService} from '../../category/category.service';
import {UpdateAdvertisementDto} from '../dto/UpdateAdvertisementDto';
import {ResponseAdvertisementDto} from '../dto/ResponseAdvertisementDto';
import {AdvertisementAddressService} from './advertisementAddress.service';
import {
  PaginatedResponse,
  AdvertisementPaginationParams,
  UserAdvertisementParams
} from '../../../utils/pagination/pagination.types';
import {BadRequestError} from '../../../exception/BadRequestError';
import {ForbiddenAccessError} from '../../../exception/ForbiddenAccessError';
import {FullAdvertisement} from '../../../types/advertisement.types';
import {GeoPoint} from '../../../types/geo.types';
import {getDistance} from 'geolib';
import {buildPagination} from '../../../utils/pagination/pagination';

const KM_PER_DEGREE = 111;
export class AdvertisementService {
  private readonly categoryService = new CategoryService();
  private readonly advertisementAddressService = new AdvertisementAddressService();

  private readonly advertisementInclude = {
    user: true,
    advertisementAddress: true,
    category: true,
    images: true
  };

  async createAdvertisement(advertisement: CreateAdvertisementDto, userId: string) {
    const advertisementAddressDb = await this.advertisementAddressService.saveAdvertisementAddress(
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
      advertisementAddressId: advertisementAddressDb.id
    };
    const advertisementDb = await prisma.advertisement.create({
      data,
      include: this.advertisementInclude
    });

    const response = AdvertisementMapper.toResponseDto(advertisementDb);

    return response;
  }

  async getAdvertisementbyId(id: string) {
    const advertisementDb = await prisma.advertisement.findUnique({
      where: {
        id: id,
        isDeleted: false
      },
      include: this.advertisementInclude
    });

    if (!advertisementDb) {
      throw new EntityNotFoundError('Anúncio', id);
    }

    const response = AdvertisementMapper.toResponseDto(advertisementDb);

    return response;
  }

  async updateAdvertisement(id: string, dto: UpdateAdvertisementDto) {
    await this.getAdvertisementbyId(id);

    const updatedAdvertisement: FullAdvertisement = await prisma.advertisement.update({
      where: {id: id},
      include: this.advertisementInclude,
      data: dto
    });

    const response: ResponseAdvertisementDto =
      AdvertisementMapper.toResponseDto(updatedAdvertisement);

    return response;
  }

  async getAdvertisementsPage(
    params: AdvertisementPaginationParams
  ): Promise<PaginatedResponse<ResponseAdvertisementDto>> {
    const {page, limit, order, priceMax, categoryId, distanceMax, userLatitude, userLongitude} =
      params;

    const orderField = order?.field;
    const orderDirection = order?.direction ?? 'asc';

    const range = distanceMax
      ? this.getBoundingBoxFromRadius(
          { latitude: userLatitude, longitude: userLongitude },
          distanceMax
        )
      : undefined;

    const skip = (page - 1) * limit;

    const orConditions: Prisma.AdvertisementWhereInput[] | undefined = params.text
      ? [
          {title: {contains: params.text, mode: 'insensitive'}},
          {description: {contains: params.text, mode: 'insensitive'}}
        ]
      : undefined;

    const whereClause = {
      isDeleted: false,
      ...(range && {
        advertisementAddress: {
          latitude: {gte: range.minLat, lte: range.maxLat},
          longitude: {gte: range.minLng, lte: range.maxLng}
        }
      }),
      ...(priceMax !== undefined && {price: {lte: priceMax}}),
      ...(categoryId && {category_id: categoryId}),
      ...(params.text && {OR: orConditions})
    };

    const [advertisements, total] = await Promise.all([
      prisma.advertisement.findMany({
        where: whereClause,
        include: this.advertisementInclude,
        skip,
        take: limit,
        orderBy: orderField ? {[orderField]: orderDirection} : undefined
      }),
      prisma.advertisement.count({
        where: whereClause
      })
    ]);

    const userLocation = {lat: userLatitude, lng: userLongitude};
    
    const ads = orderField === "distance" && distanceMax !== undefined
      ? this
        .filtrarPorRaio(advertisements, userLocation, distanceMax)
        .toSorted(
          (a, b) =>
            orderDirection === "asc"
              ? a.distance - b.distance
              : b.distance - a.distance
        )
      : advertisements;

    const advertisementResponse = ads.map(AdvertisementMapper.toResponseDto);

    return {
      data: advertisementResponse,
      pagination: buildPagination({total, page, limit})
    };
  }

  async getUserAdvertisements(userId: string, params: UserAdvertisementParams) {
    const {page, limit, order, priceMax, categoryId} = params;
    const skip = (page - 1) * limit;

    const orConditions: Prisma.AdvertisementWhereInput[] | undefined = params.text
      ? [
          {title: {contains: params.text, mode: 'insensitive'}},
          {description: {contains: params.text, mode: 'insensitive'}}
        ]
      : undefined;

    const userAdsFilter = {
      isDeleted: false,
      user_id: userId,
      ...(priceMax !== undefined && {price: {lte: priceMax}}),
      ...(categoryId && {category_id: categoryId}),
      ...(params.text && {OR: orConditions})
    };

    const [advertisements, total] = await Promise.all([
      prisma.advertisement.findMany({
        where: userAdsFilter,
        include: this.advertisementInclude,
        skip,
        take: limit,
        orderBy: {created_at: order?.direction ?? 'desc'}
      }),
      prisma.advertisement.count({
        where: userAdsFilter
      })
    ]);

    const advertisementsResponse = await Promise.all(
      advertisements.map(async (ad) => {
        return AdvertisementMapper.toResponseDto(ad);
      })
    );

    return {
      data: advertisementsResponse,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getStats(location: GeoPoint,){
    const result= await prisma.advertisement.aggregate({
      _min: {
        price: true,
      },
      _max: {
        price: true,
      }
    })

    const minPrice = result._min.price;
    const maxPrice = result._max.price;
    const advertisements = await prisma.advertisement.findMany({
      include: { advertisementAddress: true }
    });

    const userLocation = { latitude: location.lat, longitude: location.lng };

    const adsWithDistance = advertisements.map(ad => {
      const distanceMeters = getDistance(userLocation, {
        latitude: ad.advertisementAddress.latitude,
        longitude: ad.advertisementAddress.longitude
      });
      const distanceKm = distanceMeters / 1000;
      return { ...ad, distance: distanceKm };
    });

    const maxDistance = Math.max(...adsWithDistance.map(ad => ad.distance))

    return {minPrice, maxPrice, maxDistance}
  }

  async deleteAdvertisement(advertisementId: string, userId: string) {
    const result = await prisma.advertisement.updateMany({
      where: {
        id: advertisementId,
        user_id: userId,
        isDeleted: false
      },
      data: {
        isDeleted: true,
        updated_at: new Date()
      }
    });
    if (result.count === 0) {
      throw new ForbiddenAccessError();
    }
  }

  async getByIds(ids: string[], params: AdvertisementPaginationParams) {
    if (!ids?.length) {
      throw new BadRequestError('A lista de IDs está vazia ou inválida.');
    }

    const {page, limit, order, priceMax, categoryId} = params;
    const skip = (page - 1) * limit;

    const userAdsFilter = {
      id: {in: ids},
      isDeleted: false,
      ...(priceMax !== undefined && {price: {lte: priceMax}}),
      ...(categoryId && {category_id: categoryId})
    };

    const [advertisements, total] = await Promise.all([
      prisma.advertisement.findMany({
        where: userAdsFilter,
        include: this.advertisementInclude,
        skip,
        take: limit,
        orderBy: {created_at: order?.direction}
      }),

      prisma.advertisement.count({
        where: userAdsFilter
      })
    ]);

    const advertisementsResponse = await Promise.all(
      advertisements.map(async (ad) => {
        return AdvertisementMapper.toResponseDto(ad);
      })
    );

    return {
      data: advertisementsResponse,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  private filtrarPorRaio(
    anuncios: FullAdvertisement[],
    userLocation: GeoPoint,
    maxDistanceKm: number
  ): (FullAdvertisement & {distance: number})[] {
    return anuncios
      .map((ad) => {
        const location = {
          latitude: ad.advertisementAddress.latitude,
          longitude: ad.advertisementAddress.longitude
        };
        const distance = getDistance(userLocation, location) / 1000;
        return {...ad, distance};
      })
      .filter((ad) => ad.distance <= maxDistanceKm * 1000);
  }

  private getBoundingBoxFromRadius(
    center: {latitude: number; longitude: number},
    radiusKm: number
  ): {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  } {
    const delta = radiusKm / KM_PER_DEGREE;
    return {
      minLat: center.latitude - delta,
      maxLat: center.latitude + delta,
      minLng: center.longitude - delta,
      maxLng: center.longitude + delta
    };
  }
}
