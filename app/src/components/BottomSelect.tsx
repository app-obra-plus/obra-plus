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

interface Option<T> {
  label: string;
  value: T;
}

interface BottomSelectProps<T> {
  options: Option<T>[];
  value?: T;
  onChange: (val: T) => void;
  getLabel?: (val: T) => string;
  label?: string;
  placeholder?: string;
}

export default function BottomSelect<T>({
  options,
  value,
  getLabel = (val: T) => (val as unknown as string) || "",
  onChange,
  label,
  placeholder = "Selecione...",
}: BottomSelectProps<T>) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        className=" h-16 justify-center border border-support rounded-md p-2 mb-4 relative"
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text className="absolute -top-3 left-3 bg-background px-1 text-support">
          {label}
        </Text>
        <Text className="text-base">
          {value ? getLabel(value) : placeholder}
        </Text>
        <Feather name="chevron-down" size={20} color="gray" className="absolute right-2" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          className="flex-1 justify-end"
          onPress={() => setVisible(false)}
        />

        <View className="bg-white max-h-[50%] rounded-t-3xl p-6 elevation-2xl shadow-[10px_2px_5px_rgba(0,0,0,0.7)]">
          <FlatList
            data={options}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-4 border-b border-gray-200 rounded-3xl"
                onPress={() => {
                  onChange(item.value);
                  setVisible(false);
                }}
              >
                <Text className="text-base">{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
}
