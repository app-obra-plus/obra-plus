import React from "react";
import { Modal, Pressable, View } from "react-native";

interface BottomDrawerProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export default function BottomDrawer({ children, isVisible, onClose }: BottomDrawerProps) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-end"
        onPress={onClose}
      />

      <View className="bg-white max-h-[50%] rounded-t-3xl p-6 elevation-2xl shadow-[10px_2px_5px_rgba(0,0,0,0.7)]">
        <View className="m-auto w-32 h-2 rounded-lg bg-slate-300 mb-4" />
        {children}
      </View>
    </Modal>
  )
}
