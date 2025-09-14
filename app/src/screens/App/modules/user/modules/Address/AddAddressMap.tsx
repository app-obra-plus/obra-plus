import { View} from "react-native";
import Button from "../../../../../../components/Button";
import Feather from "@expo/vector-icons/Feather";
import MapComponent from "../../../../../../components/MapComponent";
import { useNavigation } from "@react-navigation/native";
import { getAddressByLocation } from "./utils/getAddressByLocation";
import { Region } from "react-native-maps";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AddressStackParamList } from "./Address.routes";

type AddAddressMapNavigationProp = NativeStackNavigationProp<
  AddressStackParamList,
  "addAddressMap"
>;

export default function AddAddressMap() {
  const [region, setRegion] = useState<Region | null>(null);
  const navigation = useNavigation<AddAddressMapNavigationProp>();

  const handleBack = () => {
    navigation.goBack() 
  }

  const handleNext = () => {
    getAddressByLocation(region?.latitude!, region?.longitude!)
      .then((address) => {
        navigation.navigate('addAddressForm', { address })
      })
  }

  return (
    <View className="h-full">
      <MapComponent setRegion={setRegion} />
      <Feather name="map-pin" size={24} color="black" className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-100%]" />
      <View className="absolute bottom-0 w-full p-4 gap-4 pb-10">
        <Button text="Avançar" onPress={handleNext}/>
        <Button text="Voltar" type="outline" onPress={handleBack}/>
      </View>
    </View>
  );
}