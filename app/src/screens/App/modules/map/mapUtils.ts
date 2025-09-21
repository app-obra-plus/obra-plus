import { Region } from "react-native-maps";

function getZoomLevel(region: Region) {
  const { latitudeDelta } = region;
  return Math.round(Math.log(360 / latitudeDelta) / Math.LN2);
}

export function getMapBounds(region: Region) {
  return {
    maxLongitude: region.longitude + region.longitudeDelta / 2,
    minLongitude: region.longitude - region.longitudeDelta / 2,
    maxLatitude: region.latitude + region.latitudeDelta / 2,
    minLatitude: region.latitude - region.latitudeDelta / 2,
  }
}

function round(num: number,step: number) {
  return Math.round(num / step) * step;
}

export function getFixedRegion(region: Region) {
  return {
    latitude: round(region.latitude, 0.008),
    longitude: round(region.longitude, 0.008)
  }
}

function getResolutionByZoom(zoom: number) {
  const map: Record<number, number> = {
    20: 0.0002,
    19: 0.0002,
    18: 0.0002,
    17: 0.0005,
    16: 0.001,
    15: 0.003,
    14: 0.005,
    13: 0.01,
    12: 0.02,
    11: 0.05,
    10: 0.1,
    9: 0.2,
    8: 0.5,
    7: 1,
    6: 2,
    5: 5,
    4: 10,
    3: 20,
    2: 50,
  }

  return map[zoom] || 50
}

export function getGrid(region: Region) {
  const mapBounds = getMapBounds(region)

  const steps = getResolutionByZoom(getZoomLevel(region))

  const startLat = Math.floor(mapBounds.minLatitude / steps) * steps
  const startLng = Math.floor(mapBounds.minLongitude / steps) * steps

  const grid = []
  for (let lat = startLat; lat < mapBounds.maxLatitude; lat += steps) {
    for (let lng = startLng; lng < mapBounds.maxLongitude; lng += steps) {
      grid.push({latitude: lat, longitude: lng})
    }
  }

  return grid
}