import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../../theme/colors";

interface AdvertisementMarkerProps {
  label: string;
}

export default function AdvertisementMarker({ label }: AdvertisementMarkerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    borderRadius: 600,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  label: {
    color: colors.white,
    backgroundColor: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 600,
    width: 24,
    height: 24,
    textAlignVertical: "center",
    fontSize: 18,
  },
});
