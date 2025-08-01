import React from "react";
import { Button, Text, Touchable, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface ButtonNavMenuProps {
  title: string;
  icon?: React.ComponentProps<typeof Feather>["name"];
  type?: "primary" | "danger";
  onPress?: () => void;
}

export default function ButtonNavMenu({ title, icon, type = "primary", onPress }: ButtonNavMenuProps) {
  const backgroundColor = type === "primary" ? "bg-white" : "bg-red-300";

  return (
    <TouchableOpacity
      className={`flex-row items-center p-4 ${backgroundColor} rounded-lg shadow justify-between mb-4`}
      onPress={onPress}
    >
      <Text className="text-xl">{title}</Text>
      {icon && <Feather name={icon} size={24} className="mr-2" />}
    </TouchableOpacity>
  );
}
