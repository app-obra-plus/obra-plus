import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import InfiniteScrollList from "../../../../components/InfiniteScrollList";
import { IAdvertisementPaginationFilter, ResponseAdvertisementDto } from "../../../../api/advertisement/advertisementSch";
import { advertisementMdl } from "../../../../api/advertisement/advertisementMdl";
import InputText from "../../../../components/Input";
import FilterButton from "./FilterButton";
import Filters from "./Filters";
import AdvertisementItem from "../Advertisements/AdvertisementItem";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { SearchStackParamList } from "./search.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLocationStore } from "../../../../stores/useLocationStore";

export interface FilterProps {
  categoryId?: string;
  priceMax?: number;
  text?: string;
}

export type SearchScreenNavigationProp = NativeStackNavigationProp<
  SearchStackParamList,
  "advertisementList"
>;

export default function SearchScreen() {
  const [filter, setFilter] = useState<FilterProps>({});
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const {location} = useLocationStore()

  const handleShowDetails = (advertisementId: string) => {
    navigation.navigate("advertisementDetails", { advertisementId });
  }

  if(!location) return <View><Text>Carregando localização...</Text></View>

  return (
    <View style={styles.container}>
      <Filters filter={filter} setFilter={setFilter} />
      <View style={styles.listContainer}>
        <LinearGradient
          colors={[colors.white, "rgba(255,255,255,0)"]}
          style={styles.topShadow}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <InfiniteScrollList<ResponseAdvertisementDto>
          fetchFn={advertisementMdl.getAllPaginated.bind(advertisementMdl)}
          keyExtractor={(item) => item.id}
          params={[{
            userLatitude: location.coords.latitude,
            userLongitude: location.coords.longitude,
            distanceMax: 100,
            text: filter.text,
            categoryId: filter.categoryId,
            priceMax: filter.priceMax,
          } as IAdvertisementPaginationFilter]}
          queryKeyPrefix="allAdvertisements"
          numColumns={2}
        >
          {(item) => <AdvertisementItem item={item} onClick={() => handleShowDetails(item.id)} />}
        </InfiniteScrollList>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  listContainer: {
    flex: 1,
  },
  topShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
    height: 16,
    
  }

})