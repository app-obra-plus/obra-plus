import React from "react";
import { Pressable, Text, TouchableOpacity } from "react-native";

type ButtonType = "primary" | "outline" | "link";
type ButtonColor = "light" | "dark";

interface ButtonProps {
  onPress?: () => void;
  text: string;
  type?: ButtonType;
  color?: ButtonColor;
  disabled?: boolean;
  bgFill?: boolean;
}

export default function Button({
  onPress,
  text,
  type = "primary",
  color = "dark",
  disabled = false,
  bgFill = false
}: ButtonProps) {
  const buttonStyles: Record<ButtonType, Record<ButtonColor, string>> = {
    primary: {
      light: "bg-primary shadow",
      dark: "bg-primary shadow"
    },
    outline: {
      light: "bg-transparent border border-white border-2",
      dark: "bg-transparent border border-black border-2"
    },
    link: {
      light: "bg-transparent",
      dark: "bg-transparent"
    }
  };

  const textStyles: Record<ButtonType, Record<ButtonColor, string>> = {
    primary: {
      light: "text-white",
      dark: "text-white"
    },
    outline: {
      light: "text-white",
      dark: "text-black"
    },
    link: {
      light: "text-white",
      dark: "text-black"
    }
  };

  const bgFillClass = bgFill ? (color === "dark" ? "bg-white" : "bg-black") : "";

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`p-4 rounded-md ${buttonStyles[type][color]} ${disabled ? "opacity-60" : "opacity-100"} ${bgFillClass}`}
      android_ripple={{ color: "rgba(0,0,0,0.1)" }}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Text className={`text-center text-xl ${textStyles[type][color]}`}>
        {text}
      </Text>
    </Pressable>
  );
}
