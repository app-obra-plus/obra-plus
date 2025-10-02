import { AdvertisementAddress } from "../../../../generated/prisma";
import { ResponseAdvertisementAddressDto } from "../ResponseAdvertisementAddressDto";

export class AdvertisementAddressMapper{
    static toResponseDto(address: AdvertisementAddress): ResponseAdvertisementAddressDto{
        const dto: ResponseAdvertisementAddressDto = {
            id: address.id,
            street: address.street,
            number: address.number,
            complement: address.complement ?? null,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            postal_code: address.postal_code,
            country: address.country,
            latitude: address.latitude,
            longitude: address.longitude,
        };
        return(dto)
    }

}