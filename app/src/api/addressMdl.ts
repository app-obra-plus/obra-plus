import { AddressResponse, AddressUpdate, CreateAddress } from "./addressSch";
import { ModeloBase } from "./ModeloBase";

class AddressMdl extends ModeloBase<AddressResponse, CreateAddress, AddressUpdate> {
  constructor() {
    super("/addresses")
  }
}

export const addressMdl = new AddressMdl();
