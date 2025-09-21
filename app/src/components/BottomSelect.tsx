import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "./Button";
import BottomDrawer from "./BottomDrawer";

interface Option<T> {
  label: string;
  value: T;
}

interface BottomSelectProps<T> {
  options: Option<T>[];
  value?: T;
  onChange: (val: T) => void;
  getLabel?: (val: T) => string;
  className?: string;
  label?: string;
  error?: string;
  placeholder?: string;
}

export default function BottomSelect<T>({
  options,
  value,
  getLabel = (val: T) => (val as unknown as string) || "",
  onChange,
  className,
  label,
  error,
  placeholder = "Selecione...",
}: BottomSelectProps<T>) {
  const [visible, setVisible] = useState(false);
  const [preSelected, setPreSelected] = useState<T | undefined>(value);

  const handleClickOption = (val: T) => {
    setPreSelected(val);
  }
  
  const handleSelect = () => {
    onChange(preSelected as T);
    setVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        className={
          "h-16 justify-center border border-support rounded-md p-2 mb-4" +
          (className ? ` ${className}` : "")
        }
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text className="absolute -top-3 left-3 bg-background px-1 text-support">
          {label}
        </Text>
        {
          error && (
            <Text className="absolute -bottom-2 right-3 bg-background px-1 text-red-800">
              {error}
            </Text>
          )
        }
        <Text className="text-base">
          {value ? getLabel(value) : placeholder}
        </Text>
        <Feather name="chevron-down" size={20} color="gray" className="absolute right-2" />
      </TouchableOpacity>

      <BottomDrawer isVisible={visible} onClose={() => setVisible(false)}>
        <Text className="text-lg font-semibold my-4">Selecione uma opção</Text>
        <FlatList
          data={options}
          keyExtractor={(_, index) => index.toString()}
          style={{ gap: "8px" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-4 rounded-3xl flex-row flex justify-between items-center"
              onPress={() => handleClickOption(item.value)}
              activeOpacity={1}
            >
              <Text className="text-lg">{item.label}</Text>
              <View className={`w-6 h-6 p-[3px] rounded-full border-2 border-primary`}>
                {
                  preSelected === item.value && (
                    <View className="w-full h-full rounded-full bg-primary m-auto" />
                  )
                }
              </View>
            </TouchableOpacity>
          )}
        />
        <Button text="Selecionar" onPress={handleSelect} disabled={!preSelected} />
      </BottomDrawer>
    </>
  );
}
