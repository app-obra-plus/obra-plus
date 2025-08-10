import React from "react";
import { Image, Text, View } from "react-native";

export default function AddressListCard() {

  const addressImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7z2ko5zXbV2GvWN3PqHLpKDnRfL4PgUGe7A&s"

  return (
    <View className="bg-white rounded-lg shadow mb-4 overflow-hidden flex-row">
      <Image
        source={{ uri: addressImage }}
        className="w-32 h-32"
        resizeMode="cover"
      />
      <View className="flex-1 justify-between p-4">
        <Text className="text-lg font-semibold">Endereço de Exemplo</Text>
        <Text className="text-gray-600">
          Rua Exemplo, 123 - Bairro Exemplo, Cidade - Estado
        </Text>
      </View>
    </View>
  )
}
