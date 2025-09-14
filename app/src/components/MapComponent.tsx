import {PropsWithChildren, useEffect, useRef} from "react";
import MapView, { Region } from "react-native-maps";
import mapStyleLight from "../styles/mapStyleLight";
import { useLocationStore } from "../stores/useLocationStore";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface IMapProps extends PropsWithChildren {}

export default function MapComponent({ children }: IMapProps) {
  const {location} = useLocationStore()
  const mapRef = useRef<MapView>(null);


  const handleMapMove = (region: Region) => {
  }

  useEffect(() => {
    if (location) {
      mapRef.current?.setCamera({
        center: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        zoom: 16,
      })
    }
  }, [location]);

  const handleCenterMap = () => {
    if (location) {
      const region: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current?.animateToRegion(region, 500); // animação de 0,5s
    }
  };

  return (
    <MapView
      ref={mapRef}
      style={{height: '100%', width: '100%'}}
      customMapStyle={mapStyleLight}
      showsUserLocation
      showsMyLocationButton={true}
      showsCompass
      onRegionChangeComplete={handleMapMove}
    >
      {children ? <>{children}</> : null}
    </MapView>
  )
}
