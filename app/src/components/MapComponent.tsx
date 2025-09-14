import {PropsWithChildren, useEffect, useRef} from "react";
import MapView, { Region } from "react-native-maps";
import mapStyleLight from "../styles/mapStyleLight";
import { useLocationStore } from "../stores/useLocationStore";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface IMapProps extends PropsWithChildren {
  onRegionChange?: (region: Region) => void;
  setRegion?: (location: Region) => void;
}

export default function MapComponent({ children, onRegionChange, setRegion }: IMapProps) {
  const {location} = useLocationStore()
  const mapRef = useRef<MapView>(null);


  const handleMapMove = (region: Region) => {
    onRegionChange?.(region);
    setRegion?.(region);
  };

  useEffect(() => {
    if (location) {
      mapRef.current?.setCamera({
        center: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        zoom: 16,
      })
      setRegion?.({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    }
  }, []);

  

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
