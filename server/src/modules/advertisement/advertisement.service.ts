import { prisma } from "../../database/client";
import { CreateAdvertisementDto } from "./dto/CreateAdvertisementDto";
import { AddressService } from '../address/address.service';
import { AdvertisementMapper } from "./dto/mapper/AdvertisementMapper";
import { AdvertisementStatus } from "../../generated/prisma";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";
import { CategoryService } from "../category/category.service";
import { UpdateAdvertisementDto } from "./dto/UpdateAdvertisementDto";
import { ResponseAdvertisementDto } from "./dto/ResponseAdvertisementDto";
import { AdvertisementMapQueryDto, SubGrid } from "./dto/AdvertisementMapQueryDto";

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
        const response = AdvertisementMapper.toResponseDto(advertisementDb);
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

        const response = AdvertisementMapper.toResponseDto(advertisementDb);
        return response;
    }

    async updateAdvertisement(id:string, dto: UpdateAdvertisementDto){
        await this.getAdvertisementbyId(id);
        const updatedAdvertisement = await prisma.advertisement.update({
            where: {id:id},
            data: dto
        })
        const response: ResponseAdvertisementDto = AdvertisementMapper.toResponseDto(updatedAdvertisement);
        return response;
    }

    async getAdvertisementGridFilter(dto: AdvertisementMapQueryDto): Promise<SubGrid[]>{

        const { latitudeStep, longitudeStep } = this.getGridCellDimensions(dto);
        const subGrids = this.generateSubGrids(dto, latitudeStep, longitudeStep);

        for (const subGrid of subGrids){
            subGrid.advertisementIds = await this.getAdvertisementBySubGrid(subGrid, dto);
        }
        
        return subGrids
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

                subGrids.push({
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
            select: { id: true },
        });

        return ads.map(a => a.id);
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
}