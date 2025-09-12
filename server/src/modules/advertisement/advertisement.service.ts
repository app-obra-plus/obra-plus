import { prisma } from '../../database/client';
import { CreateAdvertisementDto } from "./dto/CreateAdvertisementDto";
import { AddressService } from '../address/address.service';
import { AdvertisementMapper } from "./dto/mapper/AdvertisementMapper";
import { AdvertisementStatus } from "../../generated/prisma";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";
import { CategoryService } from "../category/category.service";
import { UpdateAdvertisementDto } from "./dto/UpdateAdvertisementDto";
import { ResponseAdvertisementDto } from "./dto/ResponseAdvertisementDto";
import { AdvertisementMapQueryDto, SubGrid, SubGridResponse} from "./dto/AdvertisementMapQueryDto";
import { AdvertisementAddressMapper } from "./dto/mapper/AdvertisementAddressMapper";
import { PaginatedResponse, PaginationParams } from "../../utils/pagination";

export class AdvertisementService{
    private readonly addressService = new AddressService;
    private readonly categoryService = new CategoryService;

    async createAdvertisement(advertisement: CreateAdvertisementDto, userId: string){

        const advertisementAddressDb = await this.saveAdvertisementAddress(advertisement.addressId);
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
        const advertisementDb = await prisma.advertisement.create({data});    
         
        const response = AdvertisementMapper.toResponseDto(advertisementDb, []);
        return response;            
    }

    async getAdvertisementbyId(id: string){
        const advertisementDb = await prisma.advertisement.findUnique({
               where: {
                id:id,
                status:AdvertisementStatus.ACTIVE
            }
        });

        if(!advertisementDb){
            throw new EntityNotFoundError("Anúncio", id);
        }

        const images = await this.getImages(id);
        const response = AdvertisementMapper.toResponseDto(advertisementDb, images);

        return response
        
    }

    async updateAdvertisement(id:string, dto: UpdateAdvertisementDto){
        await this.getAdvertisementbyId(id);
        const updatedAdvertisement = await prisma.advertisement.update({
            where: {id:id},
            data: dto
        })
        const images = await this.getImages(id);
        const response: ResponseAdvertisementDto = AdvertisementMapper.toResponseDto(updatedAdvertisement, images);
        return response;
    }

    
    async getAdvertisementsPage(params: PaginationParams): Promise<PaginatedResponse<ResponseAdvertisementDto>>{

        const { page, limit, order } = params;
        const skip = (page - 1) * limit;

        const [advertisements, total] = await Promise.all([
            prisma.advertisement.findMany({
                where: { isDeleted: false },
                skip,
                take: limit,
                orderBy: { created_at: order },
            }),
            prisma.advertisement.count({
                where:{isDeleted: false}
            })
        ])

        const advertisementResponse = await Promise.all(
            advertisements.map(async (ad) => {
                const images = await this.getImages(ad.id);
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

    async getAdvertisementGridFilter(dto: AdvertisementMapQueryDto): Promise<SubGridResponse[]>{

        const { latitudeStep, longitudeStep } = this.getGridCellDimensions(dto);
        const subGrids = this.generateSubGrids(dto, latitudeStep, longitudeStep);

        const result: SubGridResponse[] = [];
        for (const subGrid of subGrids){

            const advertisements = await this.getAdvertisementBySubGrid(subGrid, dto); 
            const advertisementIds= advertisements.map(a => a.id)


            if(advertisementIds.length > 1 ){
                result.push({
                    latitudeCenter: subGrid.latitudeCenter,
                    longitudeCenter: subGrid.longitudeCenter,
                    advertisementIds,
                });
            } else if (advertisementIds.length === 1 ) {
                const address =  await this.getAdvertisementAddressById(advertisements[0].advertisementAddressId);

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

        const latitudeStep = (dto.boundingBox.maxLatitude - dto.boundingBox.minLatitude) / dto.resolution;
        const longitudeStep = (dto.boundingBox.maxLongitude - dto.boundingBox.minLongitude) / dto.resolution;

        return { latitudeStep, longitudeStep };
    }
    
    private generateSubGrids(dto: AdvertisementMapQueryDto, latitudeStep: number, longitudeStep: number): SubGrid[] {
        const subGrids: SubGrid[] = [];

        for (let i = 0; i < dto.resolution; i++) {
            for (let j = 0; j < dto.resolution; j++) {
                const subBoundingBox = {
                    minLatitude: dto.boundingBox.minLatitude + i * latitudeStep,
                    maxLatitude: dto.boundingBox.minLatitude + (i + 1) * latitudeStep,
                    minLongitude: dto.boundingBox.minLongitude + j * longitudeStep,
                    maxLongitude: dto.boundingBox.minLongitude + (j + 1) * longitudeStep,
                };
                const latitudeCenter = (subBoundingBox.maxLatitude + subBoundingBox.minLatitude)/2;
                const longitudeCenter = (subBoundingBox.maxLongitude + subBoundingBox.minLongitude)/2;
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
    
    private async getAdvertisementBySubGrid(subGrid: SubGrid, dto: AdvertisementMapQueryDto){
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

    async getAdvertisementAddressById(addressId: string){
        const addressDb = await prisma.advertisementAddress.findUnique({
                 where: {
                    id:addressId,
                }
            });
        
        if(!addressDb){
            throw new EntityNotFoundError("Endereço do anúncio", addressId);
        }
        
        const addressResponse = AdvertisementAddressMapper.toResponseDto(addressDb);

        return addressResponse;
    }

    private async saveAdvertisementAddress(id: string) {
        const addressDb = await this.addressService.getAddressById(id);
        const data = {
            street:  addressDb.street,
            number: addressDb.number,
            complement: addressDb.complement,
            neighborhood: addressDb.neighborhood,
            city: addressDb.city,
            state: addressDb.state,
            postal_code: addressDb.postal_code,
            country: addressDb.country,
            latitude: addressDb.latitude,
            longitude: addressDb.longitude,
        };

        return await prisma.advertisementAddress.create({data});
    }

    async saveMultipleImages(advertisementId: string, urls: string[]){
        
        const data = urls.map((url) => ({
            url,
            advertisement_id: advertisementId
        }));

        const imagesDb = await prisma.image.createMany({data});
        return imagesDb;
    }
    
    private async getImages(advertisementId: string){
        const imagesDb = await prisma.image.findMany({
            where:{advertisement_id: advertisementId}
        })
        
        const urls = imagesDb.map(img => img.url);
        return urls
    }
}