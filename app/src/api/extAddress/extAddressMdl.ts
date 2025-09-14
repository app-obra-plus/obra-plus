import axios from "axios";
import { ModeloBase } from "../ModeloBase";

const API_URL = "https://nominatim.openstreetmap.org"

export interface ExtLocationResponse {
  address: {
    "ISO3166-2-lvl4"?: string;
    amenity?: string;
    country: string;
    country_code: string;
    house_number?: string;
    municipality?: string;
    neighbourhood?: string;
    postcode?: string;
    region?: string;
    road?: string;
    state?: string;
    state_district?: string;
    town?: string;
    city?: string;
  };
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


    const response = await axios.get<ExtLocationResponse>(
      this.apiURL + "/reverse",
      {
        params: {
          lat,
          lon,
          format: "json",
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