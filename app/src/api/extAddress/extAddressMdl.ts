import axios from "axios";
import { ModeloBase } from "../ModeloBase";

const API_URL = "https://nominatim.openstreetmap.org"

export interface ExtLocationResponse {
  address: {
  road?: string;
  house_number?: string;
  neighbourhood?: string;
  suburb?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
}
  addresstype: string;
  boundingbox: [string, string, string, string];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  place_rank: number;
  type: string;
}

class ExtAddressMdl extends ModeloBase {
  constructor() {
    super("", API_URL);
  }


  async reverseGeocode(lat: number, lon: number) {

    const FORMAT = "json"
    const response = await axios.get<ExtLocationResponse>(
      this.apiURL + "/reverse",
      {
        params: {
          lat,
          lon,
          format: FORMAT
        },
        headers: {
          "User-Agent": "Obra+"
        }
      }
    );
    return response.data;
  }
}

export const extAddressMdl = new ExtAddressMdl();