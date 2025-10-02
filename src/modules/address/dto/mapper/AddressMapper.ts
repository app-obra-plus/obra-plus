import { Address } from "../../../../generated/prisma"
import { AddressResponseDto } from "../AddressResponseDto"

export class AddressMapper{
    static toResponseDto(address: Address): AddressResponseDto{
        const dto: AddressResponseDto = {
            id: address.id,
            addressName: address.addressName,
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