import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import InputText from "../../../../components/Input";
import FilterButton from "./FilterButton";
import SelectedFilterButton from "./SelectedFilterButton";
import { colors } from "../../../../theme/colors";
import { FilterProps } from "./SearchScreen";

interface IFiltersProps {
  filter: FilterProps;
  setFilter: React.Dispatch<React.SetStateAction<FilterProps>>;
}

export default function Filters({ filter, setFilter }: IFiltersProps) {
  
  const isFilterEmpty = Object.keys(filter).length === 0;

  return (
    <View>
      <View style={styles.searchContainer}>
        <InputText
          placeholder="Pesquisar anúncios..."
        />
      </View>
      <View style={styles.filtersListContainer}>
        <FilterButton filter={filter} setFilter={setFilter} />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.selectedFilterList}
        >
          {
            isFilterEmpty && (
              <View style={styles.emptyListContainer}>
                <Text>Nenhum filtro selecionado</Text>
              </View>
            )
          }
          {
            Object.entries(filter).map(([key, value]) => {
              if (value === undefined) return null;
              return (
                <SelectedFilterButton key={key} title={key} onRemove={() => setFilter(prev => ({ ...prev, [key]: undefined }))} />
              );
            })
          }
        </ScrollView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // gap: 8,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 0,
  },
  filtersListContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  selectedFilterList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    display: 'flex',
    gap: 16,
    flexDirection: 'row',
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    color: colors.support,
    fontWeight: 'bold',
  }
})