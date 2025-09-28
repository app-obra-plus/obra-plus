import React from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../theme/colors";
import { Feather } from "@expo/vector-icons";

interface SelectedFilterButtonProps {
  title: string;
  onRemove: () => void;
}

export default function SelectedFilterButton({ title, onRemove }: SelectedFilterButtonProps) {
  return (
    <View style={styles.button}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity style={styles.closeButtonContainer} onPress={onRemove}>
        <Feather name="x" size={18} color={colors.white} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.support,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    height: 42,
  },
  closeButtonContainer: {
    backgroundColor: colors.danger,
    borderRadius: 10,
  },
  text: {
    color: colors.support,
    fontWeight: 'bold',
  }
})
