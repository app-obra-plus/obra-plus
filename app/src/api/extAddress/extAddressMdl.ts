import axios from "axios";
import { ModeloBase } from "../ModeloBase";

const API_URL = "https://nominatim.openstreetmap.org"

export interface ExtLocationResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    road: string;
    neighbourhood: string;
    town: string;
    municipality: string;
    state_district: string;
    state: string;
    ISO3166_2_lvl4: string;
    region: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: [string, string, string, string];
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