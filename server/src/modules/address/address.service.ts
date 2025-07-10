import {prisma} from '../../database/client'
import { CreateAddressDto } from './dto/CreateAddressDto';
import { AddressMapper } from './dto/mapper/AddressMapper';



export class AddressService {

    async createAddress(address:CreateAddressDto, id: string){
        const data = {...address, user_id: id };
        const addressDb = await prisma.address.create({data})
        const addressResponse =   AddressMapper.toResponseDto(addressDb);
        return addressResponse;
    }
}  