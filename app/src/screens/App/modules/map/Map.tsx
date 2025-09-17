import React, { useState } from "react";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import MapComponent from "../../../../components/MapComponent";
import FloatingButton from "../../../../components/FloatingButton";


export default function MapScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [markers, setMarkers] = useState<{
    latitude: number;
    longitude: number;
  }[]>([]);

  const [regionInfo, setRegionInfo] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 0,
  });

  const onRegionChange = (region: Region) => {
    const pins = [
      { latitude: region.latitude + region.latitudeDelta, longitude: region.longitude + region.longitudeDelta },
      { latitude: region.latitude - region.latitudeDelta, longitude: region.longitude - region.longitudeDelta },
      { latitude: region.latitude + region.latitudeDelta, longitude: region.longitude - region.longitudeDelta },
      { latitude: region.latitude - region.latitudeDelta, longitude: region.longitude + region.longitudeDelta },
      // { latitude: region.latitude, longitude: region.longitude },
      { latitude: Number(region.latitude.toFixed(2)), longitude: Number(region.longitude.toFixed(2)) },
    ]

    setMarkers(pins);

    console.log(JSON.stringify(region, null, 2));
  }


  return (
    <View style={{flex: 1}}>
    <MapComponent onRegionChange={onRegionChange}>
      {
        markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={`Marker ${index + 1}`}
            description={`Latitude: ${marker.latitude.toFixed(5)}, Longitude: ${marker.longitude.toFixed(5)}`}
            onPress={() => setModalVisible(true)}
          />
        ))
      }
      <Polyline
        coordinates={markers}
        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={3}
      />
    </MapComponent>
    <FloatingButton icon="grid" onPress={() => setModalVisible(true)} />
  </View>
  )

}

