import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  secure?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  error?: string;
}

export default function InputText(props: InputProps) {
  const [hidePassword, setHidePassword] = useState(props.secure || false);

  return (
    <View className="border border-support rounded-md p-2 mb-4 relative">
      {props.label && (
        <Text className="absolute -top-3 left-3 bg-background px-1 text-support">
          {props.label}
        </Text>
      )}
      <View className="flex-row items-center">
        <TextInput
          className="flex-1 rounded-md p-2 mt-2"
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChange}
          secureTextEntry={hidePassword}
          autoCapitalize={props.autoCapitalize || "none"}
          keyboardType={props.keyboardType || "default"}
        />
        {props.secure && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            className="absolute right-2 mt-2"
          >
            <Feather name={hidePassword ? "eye-off" : "eye"} size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
