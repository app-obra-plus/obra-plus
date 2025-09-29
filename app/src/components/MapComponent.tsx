import {PropsWithChildren, useEffect, useRef} from "react";
import MapView from "react-native-maps";
import type { Region } from "react-native-maps";
import mapStyleLight from "../styles/mapStyleLight";
import { useLocationStore } from "../stores/useLocationStore";
import { ActivityIndicator, Alert, Text, View, Linking } from "react-native";
import Button from "./Button";

interface IMapProps extends PropsWithChildren {
  onRegionChange?: (region: Region) => void;
  setRegion?: (location: Region) => void;
  displayOnly?: boolean;
}

export default function MapComponent({ 
  children, 
  onRegionChange, 
  setRegion,
  displayOnly = false
}: IMapProps) {
  const {location, isLoading, locationAllowed, setLocationAllowed, setLocation, setIsLoading} = useLocationStore()
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
  }, [location]);

  const handlePermitirAcesso = async () => {
    Alert.alert(
      "Permissão necessária",
      "Você precisa liberar o acesso à localização nas configurações do app.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Abrir configurações",
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ]
    );

    setIsLoading(false);
  }

  if(!locationAllowed) {
    return (
      <View className="flex-1 justify-center items-center gap-4 px-4">
        <Text className="text-center">Você precisa permitir o acesso à sua localização para acessar essa funcionalidade.</Text>
        <Button text="Permitir acesso à localização" onPress={handlePermitirAcesso} />
      </View>
    )
  }

  if(isLoading) {
    return (
      <View className="flex-1 justify-center items-center gap-4">
        <ActivityIndicator size={"large"}/>
        <Text>Buscando localização...</Text>
      </View>
    )
  }
  

  return (
    <MapView
      ref={mapRef}
      style={{height: '100%', width: '100%'}}
      customMapStyle={mapStyleLight}
      showsUserLocation
      showsMyLocationButton={true}
      showsCompass={true}
      onRegionChangeComplete={handleMapMove}
    >
      {children ? <>{children}</> : null}
    </MapView>
  )
}
