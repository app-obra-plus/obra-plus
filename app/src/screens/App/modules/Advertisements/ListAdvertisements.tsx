import React from "react";
import { Text, View } from "react-native";
import FloatingButton from "../../../../components/FloatingButton";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import InfiniteScrollList from "../../../../components/InfiniteScrollList";
import { advertisementMdl } from "../../../../api/advertisement/advertisementMdl";
import { IUserAdvertisementsParams, ResponseAdvertisementDto } from "../../../../api/advertisement/advertisementSch";
import { useAuthStore } from "../../../../stores/useAuthStore";
import AdvertisementItem from "./AdvertisementItem";
import { useLocationStore } from "../../../../stores/useLocationStore";

export default function ListAdvertisements() {
  const navigation = useNavigation()
  const { location } = useLocationStore()
  const {user} = useAuthStore()

  const handleAddAddressPress = () => {
    navigation.navigate("addAdvertisement" as never);
  }

  return (
    <SafeAreaView edges={["left", "right"]} className="h-full">
      <InfiniteScrollList<ResponseAdvertisementDto>
        fetchFn={advertisementMdl.listByUserId.bind(advertisementMdl)}
        keyExtractor={(item) => item.id}
        params={[{
          userId: user?.id,
          userLatitude: location?.coords.latitude || 0,
          userLongitude: location?.coords.longitude || 0
        } as IUserAdvertisementsParams]}
        queryKeyPrefix="userAdvertisements"
        numColumns={2}
      >
        {(item) => <AdvertisementItem item={item} />}
      </InfiniteScrollList>
      <FloatingButton icon="plus" onPress={handleAddAddressPress} />
    </SafeAreaView>
  )
}
