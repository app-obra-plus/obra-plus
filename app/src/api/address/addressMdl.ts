import { AxiosResponse } from "axios";
import { ModeloBase, PaginatedResponse, SpringResponseView } from "../ModeloBase";
import { AddressResponseDto, AddressUpdateDto, CreateAddressDto } from "./addressSch";

class AddressMdl extends ModeloBase<AddressResponseDto, CreateAddressDto, AddressUpdateDto> {
  constructor() {
    super("/addresses")
  }

  async listByUserId(page: number, limit: number, userId: string) {
    const response = this.defaultGetRequest<PaginatedResponse<AddressResponseDto>>(`/user/${userId}`, {
      page,
      limit,
      order: 'desc'
    });
    return response;
  }
}

export const addressMdl = new AddressMdl();
