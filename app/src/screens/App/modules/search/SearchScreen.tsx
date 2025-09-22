import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import InfiniteScrollList from "../../../../components/InfiniteScrollList";
import { ResponseAdvertisementDto } from "../../../../api/addvertisement/addvertisementSch";
import { advertisementMdl } from "../../../../api/addvertisement/advertisementMdl";
import InputText from "../../../../components/Input";
import FilterButton from "./FilterButton";
import Filters from "./Filters";
import AdvertisementItem from "../Advertisements/AdvertisementItem";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../../theme/colors";

export interface FilterProps {
  categoryId?: string;
  priceMax?: number;
}

export default function SearchScreen() {
  const [filter, setFilter] = useState<FilterProps>({});

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
          params={[filter.categoryId, filter.priceMax  ? filter.priceMax * 100 : undefined]}
          queryKeyPrefix="allAdvertisements"
          numColumns={2}
        >
          {(item) => <AdvertisementItem item={item} />}
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