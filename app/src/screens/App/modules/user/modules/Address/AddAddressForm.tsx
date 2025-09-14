import React from "react";
import { ScrollView, Text, View } from "react-native";
import Button from "../../../../../../components/Button";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AddressStackParamList } from "./Address.routes";

type AddAddressFormRouteProp = RouteProp<AddressStackParamList, "addAddressForm">;


export default function AddAddressForm() {
  const route = useRoute<AddAddressFormRouteProp>();
  const navigation = useNavigation();

  const { address } = route.params;

  return (
    <View>
      <ScrollView className="h-full">
        <Text className="text-2xl font-bold p-4">Formulário de Endereço</Text>
        <Text className="p-4">{JSON.stringify(address, null, 2)}</Text>
        <View className="h-32" />
      </ScrollView>
      <View className="absolute bottom-0 w-full p-4 gap-4 pb-10">
        <Button text="Salvar Endereço" onPress={() => {}} />
        <Button text="Voltar ao Mapa" type="outline" bgFill onPress={navigation.goBack} />
      </View>
    </View>
  )
}
