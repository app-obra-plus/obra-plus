import { prisma } from "../../database/client";
import { CreateAddressDto } from "./dto/CreateAddressDto";
import { AddressMapper } from "./dto/mapper/AddressMapper";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";
import { AddressResponseDto } from "./dto/AddressResponseDto";
import { AddressUpdateDto } from "./dto/AddressUpdateDto";
import { PaginationParamsBase, PaginatedResponse } from '../../utils/pagination/pagination.types';

export class AddressService {
  async createAddress(address: CreateAddressDto, id: string) {
    const data = { ...address, user_id: id };
    const addressDb = await prisma.address.create({ data });
    const addressResponse = AddressMapper.toResponseDto(addressDb);
    return addressResponse;
  }

  async getAddressById(addressId: string) {
    const addressDb = await prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });

    if (!addressDb) {
      throw new EntityNotFoundError("Endereço", addressId);
    }

    const addressResponse: AddressResponseDto =
      AddressMapper.toResponseDto(addressDb);
    console.log("address:", addressResponse);
    return addressResponse;
  }

  async getAllAddresses(
    userId: string,
    params: PaginationParamsBase
  ): Promise<PaginatedResponse<AddressResponseDto>> {
    const { page, limit, order } = params;
    const skip = (page - 1) * limit;

    const [addresses, total] = await Promise.all([
      prisma.address.findMany({
        where: { user_id: userId },
        skip,
        take: limit,
        orderBy: { createdAt: order },
      }),
      prisma.address.count({
        where: { user_id: userId },
      }),
    ]);

    const addressesResponse: AddressResponseDto[] = addresses.map((address) =>
      AddressMapper.toResponseDto(address)
    );

    return {
      data: addressesResponse,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateAddress(addresId: string, addressUpdate: AddressUpdateDto) {
    await this.getAddressById(addresId);

    const updatedAddress = await prisma.address.update({
      where: { id: addresId },
      data: addressUpdate,
    });
    const response = AddressMapper.toResponseDto(updatedAddress);
    return response;
  }

  async deleteAddress(addresId: string) {
    await this.getAddressById(addresId);
    await prisma.address.delete({
      where: {
        id: addresId,
      },
    });
  }
}
