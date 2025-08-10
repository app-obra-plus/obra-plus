import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import mapStyleLight from "../../../../../../styles/mapStyleLight";
import { Dimensions } from "react-native";
import InputText from "../../../../../../components/Input";
import Button from "../../../../../../components/Button";
import Feather from "@expo/vector-icons/Feather";

const screenHeight = Dimensions.get("window").height;

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

  return (
    <View className="flex-1 h-full">
      <View className="relative">
        <MapView
          style={{ height: screenHeight * 0.4 }}
          customMapStyle={mapStyleLight}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        />
        <Feather name="map-pin" size={24} color="black" className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[50%]" />
      </View>
      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-2">Adicionar Endereço</Text>
        <InputText
          placeholder="Nome do endereço"
          label="Nome"
        />
        <InputText
          placeholder="Digite o nome da rua"
          label="Rua"
        />
        <InputText
          placeholder="Digite o número"
          label="Número"
        />
        <InputText
          placeholder="Digite o bairro"
          label="Bairro"
        />
        <InputText
          placeholder="Digite a cidade"
          label="Cidade"
        />
        <InputText
          placeholder="Digite o estado"
          label="Estado"
        />
        <Button text="Salvar endereço" />
        <View className="h-12" />
      </ScrollView>
    </View>
  );
}