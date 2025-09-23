import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { SearchStackParamList } from "../../search/search.routes";

type AdvertisementScreenRouteProp = RouteProp<SearchStackParamList, "advertisementDetails">;

export default function AdvertisementScreen() {
  const route = useRoute<AdvertisementScreenRouteProp>();
  const { advertisementId } = route.params;
  return (
    <View>
      <Text>Advertisement Screen</Text>
    </View>
  )
}
