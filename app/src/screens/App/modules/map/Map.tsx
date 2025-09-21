import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import MapComponent from "../../../../components/MapComponent";
import FloatingButton from "../../../../components/FloatingButton";
import { set } from "zod";
import { useQuery } from "@tanstack/react-query";
import { advertisementMdl } from "../../../../api/addvertisement/advertisementMdl";
import { ResponseAdvertisementGridDto } from "../../../../api/addvertisement/addvertisementSch";
import { SpringResponseView } from "../../../../api/ModeloBase";
import { getFixedRegion, getGrid } from "./mapUtils";


export default function MapScreen() {
  const [region, setRegion] = useState<Region>()
  const [markers, setMarkers] = useState<{
    latitude: number;
    longitude: number;
  }[]>([]);
  
  const handleOnRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
  }

  useEffect(() => {
    if(!region) return;
    setMarkers(getGrid(region));
  }, [region])

  // const {data: gridData = []} = useQuery({
  //   queryKey: ['markers', region],
  //   queryFn: () => advertisementMdl.grid({
  //     maxLatitude: (region?.latitude || 0) + (region?.latitudeDelta || 0),
  //     minLatitude: (region?.latitude || 0) - (region?.latitudeDelta || 0),
  //     maxLongitude: (region?.longitude || 0) + (region?.longitudeDelta || 0),
  //     minLongitude: (region?.longitude || 0) - (region?.longitudeDelta || 0),
  //     resolution: 10
  //   }),
  //   select: data => data.data,
  //   enabled: !!region
  // })

  return (
    <View style={{flex: 1}}>
    <MapComponent onRegionChange={handleOnRegionChange}>
      {
        markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={`Marker ${index + 1}`}
          />
        ))
      }
      {/* {
        gridData.map((adGroup, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: adGroup.latitudeCenter, longitude: adGroup.longitudeCenter }}
            title={`Marker ${index + 1}`}
            description={`Latitude: ${adGroup.latitudeCenter.toFixed(5)}, Longitude: ${adGroup.longitudeCenter.toFixed(5)}`}
          >
            <View className="rounded-full bg-blue-500 w-6 h-6 justify-center items-center border-2 border-white">
              <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>{adGroup.advertisementIds.length}</Text>
            </View>
          </Marker>
        ))
      } */}
    </MapComponent>
  </View>
  )

}

