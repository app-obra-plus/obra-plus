import React from "react";
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native";

type ButtonType = "primary" | "outline" | "link";
type ButtonColor = "light" | "dark";

interface ButtonProps {
  onPress?: () => void;
  text: string;
  type?: ButtonType;
  color?: ButtonColor;
  disabled?: boolean;
  bgFill?: boolean;
  isLoading?: boolean;
}

export default function Button({
  onPress,
  text,
  type = "primary",
  color = "dark",
  disabled = false,
  bgFill = false,
  isLoading = false
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

  const canPress = !(disabled || isLoading);

  return (
    <Pressable
      disabled={!canPress}
      onPress={onPress}
      className={`flex h-16 items-center justify-center p-4 rounded-md ${buttonStyles[type][color]} ${!canPress ? "opacity-60" : "opacity-100"} ${bgFillClass}`}
      android_ripple={{ color: "rgba(0,0,0,0.1)" }}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      {
        isLoading ? (
          <ActivityIndicator className="" color={type === "primary" ? "white" : (color === "dark" ? "black" : "white")} />
        ) : (
          <Text className={`text-center text-xl ${textStyles[type][color]}`}>
            {text}
          </Text>
        )
      }
    </Pressable>
  );
}
