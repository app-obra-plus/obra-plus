import { ModeloBase } from "../ModeloBase";
import { AddressResponseDto, AddressUpdateDto, CreateAddressDto } from "./addressSch";

class AddressMdl extends ModeloBase<AddressResponseDto, CreateAddressDto, AddressUpdateDto> {
  constructor() {
    super("/addresses")
  }
}

export const addressMdl = new AddressMdl();
