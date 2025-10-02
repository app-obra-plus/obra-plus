import { prisma } from "../../../database/client";
import { AddressService } from "../../address/address.service";
import { EntityNotFoundError } from "../../../exception/EntityNotFoundError";
import { AdvertisementAddressMapper } from "../dto/mapper/AdvertisementAddressMapper";

export class AdvertisementAddressService {
  private readonly addressService = new AddressService();

  async getAdvertisementAddressById(addressId: string) {
    const addressDb = await prisma.advertisementAddress.findUnique({
      where: {
        id: addressId,
      },
    });

    if (!addressDb) {
      throw new EntityNotFoundError("Endereço do anúncio", addressId);
    }

    const addressResponse = AdvertisementAddressMapper.toResponseDto(addressDb);

    return addressResponse;
  }

  async saveAdvertisementAddress(id: string) {
    const addressDb = await this.addressService.getAddressById(id);
    const data = {
      street: addressDb.street,
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

    return await prisma.advertisementAddress.create({ data });
  }
}
