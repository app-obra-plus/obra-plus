import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { MaskedTextInput, MaskedTextInputProps } from "react-native-mask-text";


interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string | number) => void;
  secure?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  className?: string;
  error?: string;
  mask?: Partial<MaskedTextInputProps>;
  onBlur?: () => void;
}

export default function InputText(props: InputProps) {
  const [hidePassword, setHidePassword] = useState(props.secure || false);

  return (
    <View className={`border border-support rounded-md p-2 mb-4 relative ${props.className || ""}`}>
      {props.label && (
        <Text className="absolute -top-3 left-3 bg-background px-1 text-support">
          {props.label}
        </Text>
      )}
      {
        props.error && (
          <Text className="absolute -bottom-2 right-3 bg-background px-1 text-red-800">
            {props.error}
          </Text>
        )
      }
      <View className="flex-row items-center">
        <MaskedTextInput
          className="flex-1 rounded-md p-2 mt-2 bg-red-500"
          style={{ width: "100%", height: 40 }}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={(text, raw) => {
            props.onChange?.(raw)
          }}
          secureTextEntry={hidePassword}
          autoCapitalize={props.autoCapitalize || "none"}
          keyboardType={props.keyboardType || "default"}
          onBlur={props.onBlur}
          {...props.mask}
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
