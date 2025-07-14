import {prisma} from '../../database/client'
import { CreateAddressDto } from './dto/CreateAddressDto';
import { AddressMapper } from './dto/mapper/AddressMapper';
import { EntityNotFoundError } from '../../exception/EntityNotFoundError';
import { AddressResponseDto } from './dto/AddressResponseDto';
import { Address } from '../../generated/prisma/index';
import { AddressUpdateDto } from './dto/AddressUpdateDto';


export class AddressService {

    async createAddress(address:CreateAddressDto, id: string){
        const data = {...address, user_id: id };
        const addressDb = await prisma.address.create({data})
        const addressResponse =   AddressMapper.toResponseDto(addressDb);
        return addressResponse;
    }

    async  getAddressById(addressId: string ){
        const addressDb = await prisma.address.findUnique({
             where: {
                id:addressId,
            }
        });

        if(!addressDb){
            throw new EntityNotFoundError("Endereço", addressId);
        }

        const addressResponse: AddressResponseDto = AddressMapper.toResponseDto(addressDb);
        console.log("address:",addressResponse)
        return addressResponse;
    }

    async getAllAddresses(userId: string){
        const addresses: Address[] = await prisma.address.findMany({
            where: {
                user_id: userId,
            },
        });

        const addressesResponse: AddressResponseDto[] = addresses.map (addresse => AddressMapper.toResponseDto(addresse));
        return addressesResponse;
    }

    async updateAddress(addresId: string, addressUpdate: AddressUpdateDto ){
        await this.getAddressById(addresId);

        const updatedAddress = await prisma.address.update({
            where: { id:addresId },
            data: addressUpdate,
        });
        const response = AddressMapper.toResponseDto(updatedAddress);
        return response;
    }

    async deleteAddress(addresId: string){
        await this.getAddressById(addresId);
        await prisma.user.delete({
            where: {
                id: addresId,
            },
        });
    }
}