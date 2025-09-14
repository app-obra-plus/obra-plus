import { ModeloBase } from "../ModeloBase";
import { AddressResponse, AddressUpdate, CreateAddress } from "./addressSch";

class AddressMdl extends ModeloBase<AddressResponse, CreateAddress, AddressUpdate> {
  constructor() {
    super("/addresses")
  }
}

export const addressMdl = new AddressMdl();
