import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { colors } from "../theme/colors";
import BottomSelect from "./BottomSelect";

interface SliderInputProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

export default function SliderInput({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: SliderInputProps) {
  const screenWidth = Dimensions.get("window").width;


  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text>{label}</Text>
        <Text>R$ {value.toFixed(2)}</Text>
      </View>
      <View className="flex-1">
        <MultiSlider
          values={[value]}
          min={min}
          max={max}
          step={step}
          onValuesChange={(vals) => onChange(vals[0])}
          selectedStyle={styles.sliderSelected}
          unselectedStyle={styles.sliderUnselected}
          markerStyle={styles.marker}
          containerStyle={styles.sliderContainer}
          trackStyle={styles.track}
          sliderLength={screenWidth - 74}
        />
        
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sliderContainer: {
    height: 40,
  },
  sliderSelected: {
    backgroundColor: colors.primary
  },
  sliderUnselected: {
    backgroundColor: colors.support,
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.support,
  },
  marker: {
    backgroundColor: colors.primary,
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.support,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
});
