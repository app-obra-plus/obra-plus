import { Region } from "react-native-maps";

function getZoomLevel(region: Region): number {
  const { latitudeDelta } = region;
  return Math.round(Math.log(360 / latitudeDelta) / Math.LN2);
}

export function getMapBounds(region: Region) {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = region;

  return {
    maxLongitude: longitude + longitudeDelta,
    minLongitude: longitude - longitudeDelta,
    maxLatitude: latitude + latitudeDelta,
    minLatitude: latitude - latitudeDelta,
  };
}

function roundToStep(num: number, step: number): number {
  return Math.round(num / step) * step;
}

export function getFixedRegion(region: Region) {
  return {
    latitude: roundToStep(region.latitude, 0.008),
    longitude: roundToStep(region.longitude, 0.008),
  };
}

function getResolutionByZoom(zoom: number): number {
  const resolutionMap: Record<number, number> = {
    20: 0.001,
    19: 0.001,
    18: 0.003,
    17: 0.003,
    16: 0.005,
    15: 0.01,
    14: 0.02,
    13: 0.02,
    12: 0.05,
    11: 0.1,
    10: 0.2,
    9: 0.5,
    8: 1,
    7: 2,
    6: 5,
    5: 10,
    4: 20,
    3: 50,
    2: 100,
  };

  return resolutionMap[zoom] ?? 50;
}

function getTicks(min: number, max: number, step: number): number[] {
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step + step;
  const ticks: number[] = [];

  for (let value = start; value <= end; value += step) {
    ticks.push(value);
  }

  return ticks;
}

function getHorizontalTicks(region: Region): number[] {
  const resolution = getResolutionByZoom(getZoomLevel(region));
  const { minLatitude, maxLatitude } = getMapBounds(region);
  return getTicks(minLatitude, maxLatitude, resolution);
}

function getVerticalTicks(region: Region): number[] {
  const resolution = getResolutionByZoom(getZoomLevel(region));
  const { minLongitude, maxLongitude } = getMapBounds(region);
  return getTicks(minLongitude, maxLongitude, resolution);
}

export function debugGrid(region: Region) {
  const horizontalTicks = getHorizontalTicks(region);
  const verticalTicks = getVerticalTicks(region);

  const lines: { latitude: number; longitude: number }[][] = [];

  horizontalTicks.forEach(lat => {
    lines.push([
      { latitude: lat, longitude: region.longitude - region.longitudeDelta },
      { latitude: lat, longitude: region.longitude + region.longitudeDelta },
    ]);
  });

  verticalTicks.forEach(lng => {
    lines.push([
      { latitude: region.latitude - region.latitudeDelta, longitude: lng },
      { latitude: region.latitude + region.latitudeDelta, longitude: lng },
    ]);
  });

  return lines;
}

export interface GridCell {
  maxLatitude: number;
  minLatitude: number;
  maxLongitude: number;
  minLongitude: number;
}

export function getGrid(region?: Region): GridCell[] {
  if (!region) return [];

  const horizontalTicks = getHorizontalTicks(region);
  const verticalTicks = getVerticalTicks(region);

  const grid: GridCell[] = [];

  for (let i = 0; i < horizontalTicks.length - 1; i++) {
    for (let j = 0; j < verticalTicks.length - 1; j++) {
      grid.push({
        maxLatitude: horizontalTicks[i + 1],
        minLatitude: horizontalTicks[i],
        maxLongitude: verticalTicks[j + 1],
        minLongitude: verticalTicks[j],
      });
    }
  }

  return grid;
}

export function getSearchBounds(region?: Region): GridCell[] {
  if (!region) return [];

  const { minLatitude, maxLatitude, minLongitude, maxLongitude } = getMapBounds(region);
  const resolution = getResolutionByZoom(getZoomLevel(region));

  const minLat = Math.floor(minLatitude * resolution) / resolution;
  const maxLat = Math.ceil(maxLatitude * resolution) / resolution;
  const minLng = Math.floor(minLongitude * resolution) / resolution;
  const maxLng = Math.ceil(maxLongitude * resolution) / resolution;

  return [{
    minLatitude: minLat,
    maxLatitude: maxLat,
    minLongitude: minLng,
    maxLongitude: maxLng,
  }];
}
