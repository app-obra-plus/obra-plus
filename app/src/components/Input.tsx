import React from "react";
import { Text, TextInput, View } from "react-native";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
}

export default function InputText(props: InputProps) {
  return (
    <View className="mb-4 border border-gray-300 p-2 rounded-lg">
      {props.label && (
        <Text className="text-gray-700 font-medium">{props.label}</Text>
      )}
      <TextInput
        className="text-gray-900 m-0 p-0 text-base"
        placeholder={props.placeholder}
        value={props.value}
      />
    </View>
  );
}
