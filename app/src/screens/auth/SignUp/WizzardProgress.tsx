import React from "react";
import { StyleSheet, View } from "react-native";

interface WizzardProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function WizzardProgress({ currentStep, totalSteps }: WizzardProgressProps) {
  return (
    <View style={styles.progressContainer}>
      {
        Array.from({ length: totalSteps }, (_, index) => (
          <View
            key={index}
            style={{
              backgroundColor: index < currentStep ? "blue" : "gray",
              ...styles.stepIndicator,
            }}
          />
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  stepIndicator: {
    width: 20,
    height: 20,
    borderRadius: 500,
    marginHorizontal: 5,
  },
});
