import React, { useEffect, useMemo, useState } from "react";
import { Marker } from "react-native-maps";
import type { Region } from "react-native-maps";
import { View } from "react-native";
import { debugGrid, getGrid, getSearchBounds, GridCell } from "./mapUtils";
import { useQueries } from "@tanstack/react-query";
import { advertisementMdl } from "../../../../api/advertisement/advertisementMdl";
import MapComponent from "../../../../components/MapComponent";
import AdvertisementMarker from "./components/advertisementMarker";


export default function MapScreen() {
  const [region, setRegion] = useState<Region>()
  const [gridRequestDataList, setGridRequestDataList] = useState<GridCell[]>([])
  const [markers, setMarkers] = useState<{
    latitude: number;
    longitude: number;
  }[]>([]);
  
  const handleOnRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
  }

  useEffect(() => {
    setGridRequestDataList(getGrid(region!) || [])
  }, [region])

  const results = useQueries({
    queries: gridRequestDataList.map((gridRequestData) => ({
      queryKey: ["advertisementMdl", "grid", gridRequestData],
      queryFn: () => advertisementMdl.grid({
        minLatitude: gridRequestData.minLatitude,
        maxLatitude: gridRequestData.maxLatitude,
        minLongitude: gridRequestData.minLongitude,
        maxLongitude: gridRequestData.maxLongitude,
        resolution: 10
      })
    })),
  })

  const flatMarkers = useMemo(
    () => results.flatMap(result => result.data?.data || []),
    [results]
  );

  return (
    <View style={{flex: 1}}>
      <MapComponent onRegionChange={handleOnRegionChange}>
        {
          flatMarkers.map((marker, index) => (
            <Marker
              key={`${marker.latitudeCenter}-${marker.longitudeCenter}`}
              coordinate={{
                latitude: marker.latitudeCenter,
                longitude: marker.longitudeCenter,
              }}
            >
              <AdvertisementMarker label={marker.advertisementIds.length.toString()} />
            </Marker>
          ))
        }
      </MapComponent>
    </View>
  )

}

