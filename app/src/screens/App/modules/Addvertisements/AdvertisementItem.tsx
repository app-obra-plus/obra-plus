import React from "react";
import { Image, Text, View } from "react-native";
import { ResponseAdvertisementDto } from "../../../../api/addvertisement/addvertisementSch";

interface IAdvertisementForm {
  item: ResponseAdvertisementDto
}

export default function AdvertisementItem({ item }: IAdvertisementForm) {
  return (
    <View className="w-full p-4 pb-0">
      <View className=" flex-row item gap-4 border border-gray-200 rounded-md overflow-hidden">
        <View className="h-32 w-32 pr-4">
          <Image
            source={{ uri: item?.images[0]?.url || "" }}
            className="h-full w-full object-cover"
          />
        </View>
        <View className="w-full">
          <View>
            <Text className="text-xl font-bold">{item?.title}</Text>
            <Text className="text-md">{item?.description}</Text>
          </View>
          <View className="w-full text-right">
            <Text className="text-primary text-2xl font-bold text-right">R$ {item?.price.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
