import React from "react";
import { Image, Text, View } from "react-native";
import { ResponseAdvertisementDto } from "../../../../api/addvertisement/addvertisementSch";

interface IAdvertisementForm {
  item: ResponseAdvertisementDto
}

export default function AdvertisementItem({ item }: IAdvertisementForm) {
  return (
    <View className="bg-white h-40 rounded-xl m-4 shadow mb-4 overflow-hidden flex-row  elevation-lg">
      <View className="flex h-full w-32 mr-4 items-center justify-center">
        <Image
            source={{ uri: item?.images[0]?.url || "" }}
            className="h-full w-full object-cover"
          />
      </View>
      <View className="flex-1 justify-between py-4 pr-4">
        <View className="w-full h-full flex justify-between">
          <View>
            <Text className="text-xl font-bold">{item?.title}</Text>
            <Text className="text-md">{item?.description}</Text>
          </View>
          <View className="w-full flex-row justify-end">
            {
              item.isDonation ? (
                <Text className="text-white bg-secondary text-xl font-bold text-right p-1 rounded-md">Doação</Text>
              ) : (
                <Text className="text-primary text-2xl font-bold text-right">R$ {(item?.price/100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Text>
              )
            }
          </View>
        </View>
      </View>
    </View>
  )
}
