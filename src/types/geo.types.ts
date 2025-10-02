export interface AdvertisementWithAddress {
  id: string;
  advertisementAddress: {
    latitude: number;
    longitude: number;
  };
}

export interface SimplifiedAdLocation {
  id: string;
  lat: number;
  lng: number;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}