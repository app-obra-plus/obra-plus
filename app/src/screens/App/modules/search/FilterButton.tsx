import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../../theme/colors";
import { Feather } from "@expo/vector-icons";
import BottomDrawer from "../../../../components/BottomDrawer";
import SliderInput from "../../../../components/SliderInput";
import { FilterProps } from "./SearchScreen";
import BottomSelect from "../../../../components/BottomSelect";
import { useQuery } from "@tanstack/react-query";
import categoryMdl from "../../../../api/caregory/categoryMdl";

interface FilterButtonProps {
  filter: FilterProps;
  setFilter: React.Dispatch<React.SetStateAction<FilterProps>>;
}

export default function FilterButton({ filter, setFilter }: FilterButtonProps) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryMdl.getAll(),
    select: (data) => data.data
  })

  return (
    <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
      <Feather name="sliders" size={18} color={colors.white} />
      <Text style={styles.text}>Filtros</Text>
      <BottomDrawer isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} >
        <View style={styles.formContainer}>
          <SliderInput
            label="Preço máximo"
            max={1000}
            value={filter.priceMax !== undefined ? filter.priceMax : 1000}
            onChange={(value) => setFilter(prev => ({ ...prev, priceMax: value == 1000 ? undefined : value }))}
          />
          <BottomSelect<string>
            options={categories.map(c => ({ label: c.name, value: c.id }))}
            value={filter.categoryId}
            label="Categoria"
            onChange={value => setFilter(prev => ({ ...prev, categoryId: value }))}
            placeholder="Selecione"
            getLabel={(val) => categories.find(c => c.id === val)?.name || ""}
          />
        </View>
      </BottomDrawer>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    height: 42,
    backgroundColor: colors.secondary,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
  },
  formContainer: {
    gap: 24,
  }
})
