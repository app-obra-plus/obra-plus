import React from "react";
import { Text, TouchableOpacity } from "react-native";

type ButtonVariants = "primary" | "outline" | "link";

interface ButtonProps {
  onPress?: () => void;
  text: string;
  variant?: ButtonVariants;
}

export default function Button({ onPress, text, variant = "primary" }: ButtonProps) {

  const buttonStyles: Record<ButtonVariants, string> = {
    primary: "shadow bg-primary",
    outline: "shadow bg-transparent border border-white border-2",
    link: "bg-transparent"
  }

  return (
    <TouchableOpacity className={`p-4 rounded-lg  ${buttonStyles[variant]}`} onPress={onPress}>
      <Text className={`text-center text-xl text-white`}>{text}</Text>
    </TouchableOpacity>
  )
}
  