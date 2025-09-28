import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface ToggleButtonProps {
  value?: boolean;
  onChange?: (val: boolean) => void;
  label?: string;
  className?: string;
}

export default function ToggleButton({
  value = false,
  onChange,
  label,
  className,
}: ToggleButtonProps) {
  const [active, setActive] = useState(value);

  function toggle() {
    const newValue = !active;
    setActive(newValue);
    onChange?.(newValue);
  }

  return (
    <View className={`w-full h-16 justify-between flex-row items-center mb-4 ${className}`}>
      <Text>
        {label}
      </Text>
      <TouchableOpacity
        className={`w-14 h-8 rounded-full p-1 flex-row items-center ${
          active ? "bg-green-500" : "bg-gray-300"
        }`}
        onPress={toggle}
        activeOpacity={0.8}
      >
        <View
          className={`w-6 h-6 rounded-full bg-white shadow ${
            active ? "ml-6" : "ml-0"
          }`}
        />
      </TouchableOpacity>
    </View>
  );
}