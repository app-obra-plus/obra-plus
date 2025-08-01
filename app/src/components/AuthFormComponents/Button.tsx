import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../styles/style";
import Feather from "@expo/vector-icons/Feather";
import React from "react";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  rightIcon?: React.ComponentProps<typeof Feather>["name"];
  leftIcon?: React.ComponentProps<typeof Feather>["name"];
  disabled?: boolean;
}

export default function Button({ title, onPress, variant = "primary", disabled = false, rightIcon, leftIcon }: ButtonProps) {
  const isPrimary = variant === "primary";

  const backgroundColor = disabled
    ? colors.PRIMARY_LIGHT
    : isPrimary
    ? colors.PRIMARY
    : colors.BACKGROUND;

  const textColor = isPrimary
    ? colors.BACKGROUND
    : colors.PRIMARY;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }, disabled && styles.buttonDisabled]}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {
        leftIcon && (
          <Feather
            style={[styles.icon, { left: 10 }]}
            name={leftIcon}
            size={24}
            color={textColor}
          />
        )
      }
      <Text style={[styles.text, { color: textColor }]}>
        {title}
      </Text>
      {
        rightIcon && (
          <Feather
            style={styles.icon}
            name={rightIcon}
            size={24}
            color={textColor}
          />
        )
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.PRIMARY,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
