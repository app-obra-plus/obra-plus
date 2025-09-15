import React from "react";
import { Image, Text, View } from "react-native";
import { AddressResponseDto } from "../../../../../../api/address/addressSch";
import MapComponent from "../../../../../../components/MapComponent";
import { Feather } from "@expo/vector-icons";

interface IAddressListCardProps {
  address: AddressResponseDto
}

export default function AddressListCard({ address }: IAddressListCardProps) {
  return (
    <View className="bg-white rounded-lg shadow mb-4 h-fit overflow-hidden flex-row border border-1 border-gray-400">
      <View className="flex h-32 w-32 items-center justify-center">
        <Feather name="map-pin" size={42} color="#3b82f6" />
      </View>
      <View className="flex-1 justify-between p-4">
        <Text className="text-lg font-semibold">{address.number} {address.complement && "(" + address.complement + ")"} - {address?.street}</Text>
        <Text className="text-gray-600">
          {address.neighborhood}, {address.city} - {address.state}
        </Text>
      </View>
    </View>
  )
}
