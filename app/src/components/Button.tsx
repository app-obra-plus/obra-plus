import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  onPress?: () => void;
  text: string;
  variant?: "primary" | "secondary";
}

export default function Button({ onPress, text, variant = "primary" }: ButtonProps) {
  return (
    <TouchableOpacity className={`p-3 rounded-lg shadow ${variant === "primary" ? "bg-blue-500" : "bg-gray-500"}`} onPress={onPress}>
      <Text className="text-white text-center text-xl">{text}</Text>
    </TouchableOpacity>
  )
}
  