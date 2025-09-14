import { AddressUpdate, CreateAddress } from "../../../../../../../api/address/addressSch"
import { extAddressMdl } from "../../../../../../../api/extAddress/extAddressMdl"

async function getAddressByLocation(latitude: number, longitude: number) {
  try {
    const response = await extAddressMdl.reverseGeocode(latitude, longitude)

    console.log(response)

    const address: AddressUpdate = {
      street: response.address.road,
      number: response.address.house_number,
      complement: undefined,
      neighborhood: response.address.neighbourhood,
      city: response.address.city,
      state: response.address.state,
      postal_code: response.address.postcode,
      country: response.address.country,
      latitude: latitude,
      longitude: longitude
    }

    return address
  } catch (error) {
    console.log(error)
    return null
  }
}

export { getAddressByLocation }