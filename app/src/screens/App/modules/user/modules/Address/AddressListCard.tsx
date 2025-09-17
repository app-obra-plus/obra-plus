import React from "react";
import { Image, Text, View } from "react-native";
import { AddressResponseDto } from "../../../../../../api/address/addressSch";
import MapComponent from "../../../../../../components/MapComponent";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../../../../theme/colors";

interface IAddressListCardProps {
  address: AddressResponseDto
}

export default function AddressListCard({ address }: IAddressListCardProps) {
  return (
    <View className="bg-white rounded-xl shadow mb-4 h-fit overflow-hidden flex-row  elevation-lg">
      <View className="flex p-7 items-center justify-center">
        <Feather name="map-pin" size={32} color={colors.primary} />
      </View>
      <View className="flex-1 justify-between py-4 pr-4">
        <Text className="text-lg font-semibold">{address.addressName}</Text>
        <Text className="text-gray-600">
          {address.street}, {address.number} - {address.neighborhood}, {address.city} - {address.state}
        </Text>
      </View>
    </View>
  )
}
