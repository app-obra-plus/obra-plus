import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Region } from "react-native-maps";
import mapStyleLight from "../../../../../../styles/mapStyleLight";
import { Dimensions } from "react-native";
import InputText from "../../../../../../components/Input";
import Button from "../../../../../../components/Button";
import Feather from "@expo/vector-icons/Feather";
import ButtonNavMenu from "../../ButtonNavMenu";
import { extAddressMdl } from "../../../../../../api/extAddressMdl";


export default function AddAddress() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando localização...</Text>
      </View>
    );
  }

  const handleMapMove = (region: Region) => {
    extAddressMdl.reverseGeocode(
      region.latitude,
      region.longitude
    ).then((data) => {
      console.log(data)
    }).catch(e => console.error(e))
  }

  return (
    <View>
      <MapView
        style={{ height: "100%" }}
        customMapStyle={mapStyleLight}
        onRegionChangeComplete={handleMapMove}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
      <Feather name="map-pin" size={24} color="black" className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[50%]" />
      <View className="absolute bottom-0 w-full p-4">
        <ButtonNavMenu title="Selecionar Localização" type="primary" icon="arrow-right"/>
      </View>
    </View>
  );
}