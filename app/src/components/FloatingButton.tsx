import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

interface IFloatingButtonProps {
  onPress?: () => void;
  icon: keyof typeof Feather.glyphMap;
  
}

export default function FloatingButton({ onPress, icon }: IFloatingButtonProps) {
  return (
    <TouchableOpacity className="absolute bottom-0 right-0 m-4 p-4 bg-primary rounded-full shadow" onPress={onPress}>
      <Feather name={icon} size={24} color="white" />
    </TouchableOpacity>
  )
}
