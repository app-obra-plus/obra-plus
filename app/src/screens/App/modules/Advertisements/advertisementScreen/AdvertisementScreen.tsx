import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SearchStackParamList } from "../../search/search.routes";
import { useQuery } from "@tanstack/react-query";
import { advertisementMdl } from "../../../../../api/addvertisement/advertisementMdl";
import Button from "../../../../../components/Button";

type AdvertisementScreenRouteProp = RouteProp<SearchStackParamList, "advertisementDetails">;

const { width } = Dimensions.get("window");


export default function AdvertisementScreen() {
  const route = useRoute<AdvertisementScreenRouteProp>();
  const { advertisementId } = route.params;

  const { data: advertisement } = useQuery({
    queryKey: ["advertisement", advertisementId],
    queryFn: () => advertisementMdl.getById(advertisementId),
    select: (res) => res.data,
  })

  return (
    <View className="p-4">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {advertisement?.images.map((img) => (
          <View key={img.id} style={{ width }}>
            <Image
              source={{ uri: img.url }}
              style={{ height: 250, width: width - 32 }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
      <Text className="text-3xl font-semibold mt-4">{advertisement?.title}</Text>
      <Text className="text-4xl font-bold text-secondary text-right">R$ {((advertisement?.price || 0) / 100).toFixed(2)}</Text>
      <Text className="text-md mt-4">{advertisement?.description}</Text>
      <View className="py-16">
        <Button text="Entrar em contato"/>

      </View>
    </View>
  )
}
