
import {AddressResponseDto} from "../../../server/src/modules/address/dto/AddressResponseDto";
import {AddressUpdateDto} from "../../../server/src/modules/address/dto/AddressUpdateDto";
import {CreateAddressDto} from "../../../server/src/modules/address/dto/CreateAddressDto";

interface AddressResponse extends AddressResponseDto {}

interface AddressUpdate extends AddressUpdateDto {}

interface CreateAddress extends CreateAddressDto {}

export {
  AddressResponse,
  AddressUpdate,
  CreateAddress
}